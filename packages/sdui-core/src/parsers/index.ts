import type { IStreamParser } from './base-parser';
import { JSONLinesParser, StreamingJSONParser, SSEParser } from './json-parser';
import { DSLParser } from './dsl-parser';

/**
 * 지원하는 파서 포맷
 */
export type ParserFormat =
  | 'json'        // Streaming JSON (중괄호 추적)
  | 'jsonl'       // JSON Lines (한 줄 = 한 객체)
  | 'dsl'         // DSL
  | 'sse';        // Server-Sent Events

/**
 * 파서 팩토리
 * 포맷에 따라 적절한 파서 인스턴스 반환
 *
 * @param format - 파서 포맷
 * @returns IStreamParser 인스턴스
 *
 * @example
 * ```typescript
 * const parser = createParser('dsl');
 * const actions = parser.append('Card\n  CardTitle: Hello\n');
 * ```
 */
export function createParser(format: ParserFormat = 'jsonl'): IStreamParser {
  switch (format) {
    case 'json':
      return new StreamingJSONParser();

    case 'jsonl':
      return new JSONLinesParser();

    case 'dsl':
      return new DSLParser();

    case 'sse':
      return new SSEParser();

    default:
      console.warn(`Unknown parser format: ${format}, using jsonl`);
      return new JSONLinesParser();
  }
}

/**
 * 파일 확장자로 파서 포맷 추론
 *
 * @param filename - 파일명 또는 경로
 * @returns 추론된 ParserFormat
 *
 * @example
 * ```typescript
 * detectFormat('schema.dsl') // 'dsl'
 * detectFormat('data.jsonl') // 'jsonl'
 * ```
 */
export function detectFormat(filename: string): ParserFormat {
  const ext = filename.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'dsl':
    case 'sdui':
      return 'dsl';

    case 'json':
      return 'json';

    case 'jsonl':
    case 'ndjson':
      return 'jsonl';

    default:
      return 'jsonl';
  }
}

/**
 * 포맷별 Content-Type 반환
 *
 * @param format - 파서 포맷
 * @returns Content-Type 헤더 값
 */
export function getContentType(format: ParserFormat): string {
  switch (format) {
    case 'json':
      return 'application/json';

    case 'jsonl':
      return 'application/x-ndjson';

    case 'dsl':
      return 'text/plain';

    case 'sse':
      return 'text/event-stream';

    default:
      return 'application/x-ndjson';
  }
}

// Export all parser types and interfaces
export * from './base-parser';
export * from './json-parser';
export * from './dsl-parser';
