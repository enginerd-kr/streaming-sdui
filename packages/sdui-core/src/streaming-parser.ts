import type { StreamAction, StreamEvent } from './types';

/**
 * 부분 JSON을 파싱하는 스트리밍 파서
 * LLM이 생성하는 JSON을 증분적으로 파싱합니다
 */
export class StreamingJSONParser {
  private buffer = '';
  private depth = 0;
  private inString = false;
  private escapeNext = false;
  private currentObjectStart = -1;

  /**
   * 새로운 청크를 추가하고 완전한 JSON 객체를 반환
   */
  append(chunk: string): StreamAction[] {
    const results: StreamAction[] = [];

    for (let i = 0; i < chunk.length; i++) {
      const char = chunk[i];
      this.buffer += char;

      // 문자열 내부 처리
      if (this.inString) {
        if (this.escapeNext) {
          this.escapeNext = false;
          continue;
        }
        if (char === '\\') {
          this.escapeNext = true;
          continue;
        }
        if (char === '"') {
          this.inString = false;
        }
        continue;
      }

      // 문자열 시작
      if (char === '"') {
        this.inString = true;
        continue;
      }

      // 깊이 추적
      if (char === '{' || char === '[') {
        if (this.depth === 0) {
          this.currentObjectStart = this.buffer.length - 1;
        }
        this.depth++;
      } else if (char === '}' || char === ']') {
        this.depth--;

        // 완전한 객체가 완성됨
        if (this.depth === 0 && this.currentObjectStart >= 0) {
          const jsonStr = this.buffer.substring(this.currentObjectStart);
          try {
            const parsed = JSON.parse(jsonStr) as StreamAction;
            results.push(parsed);

            // 버퍼 초기화
            this.buffer = '';
            this.currentObjectStart = -1;
          } catch (e) {
            // JSON이 아직 완전하지 않음
            console.debug('Incomplete JSON, continuing...', e);
          }
        }
      }
    }

    return results;
  }

  /**
   * 버퍼 초기화
   */
  reset(): void {
    this.buffer = '';
    this.depth = 0;
    this.inString = false;
    this.escapeNext = false;
    this.currentObjectStart = -1;
  }

  /**
   * 현재 버퍼 상태 반환
   */
  getBuffer(): string {
    return this.buffer;
  }
}

/**
 * JSONL (JSON Lines) 형식 파서
 * 각 줄이 하나의 JSON 객체인 형식
 */
export class JSONLinesParser {
  private buffer = '';

  /**
   * 새로운 청크를 추가하고 완전한 라인들을 파싱
   */
  append(chunk: string): StreamAction[] {
    this.buffer += chunk;
    const results: StreamAction[] = [];

    const lines = this.buffer.split('\n');

    // 마지막 라인은 불완전할 수 있으므로 버퍼에 유지
    this.buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      try {
        const parsed = JSON.parse(trimmed) as StreamAction;
        results.push(parsed);
      } catch (e) {
        console.error('Failed to parse line:', trimmed, e);
      }
    }

    return results;
  }

  /**
   * 버퍼 초기화
   */
  reset(): void {
    this.buffer = '';
  }

  /**
   * 현재 버퍼 상태 반환
   */
  getBuffer(): string {
    return this.buffer;
  }
}

/**
 * Server-Sent Events (SSE) 파서
 */
export class SSEParser {
  private buffer = '';
  private eventType = 'message';

  /**
   * SSE 형식의 데이터를 파싱
   */
  append(chunk: string): StreamAction[] {
    this.buffer += chunk;
    const events: StreamAction[] = [];

    // SSE는 \n\n으로 메시지 구분
    const messages = this.buffer.split('\n\n');

    // 마지막 메시지는 불완전할 수 있음
    this.buffer = messages.pop() || '';

    for (const message of messages) {
      if (!message.trim()) continue;

      const lines = message.split('\n');
      let data = '';
      let eventType = 'message';

      for (const line of lines) {
        if (line.startsWith('event:')) {
          eventType = line.substring(6).trim();
        } else if (line.startsWith('data:')) {
          data += line.substring(5).trim();
        }
      }

      if (data) {
        try {
          const parsedData = JSON.parse(data) as StreamAction;
          events.push(parsedData);
        } catch (e) {
          console.error('Failed to parse SSE data:', data, e);
        }
      }
    }

    return events;
  }

  /**
   * 버퍼 초기화
   */
  reset(): void {
    this.buffer = '';
    this.eventType = 'message';
  }

  /**
   * 현재 버퍼 상태 반환
   */
  getBuffer(): string {
    return this.buffer;
  }
}

/**
 * 스트리밍 방식에 따라 적절한 파서 반환
 */
export function createParser(format: 'json' | 'jsonl' | 'sse' = 'jsonl') {
  switch (format) {
    case 'json':
      return new StreamingJSONParser();
    case 'jsonl':
      return new JSONLinesParser();
    case 'sse':
      return new SSEParser();
    default:
      return new JSONLinesParser();
  }
}
