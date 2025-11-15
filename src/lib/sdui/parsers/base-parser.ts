import type { StreamAction } from '../types';

/**
 * 스트리밍 파서 공통 인터페이스
 * 모든 파서(JSON, Pug, YAML 등)가 구현해야 하는 인터페이스
 */
export interface IStreamParser {
  /**
   * 새로운 청크를 추가하고 완성된 StreamAction들을 반환
   * @param chunk - 스트리밍으로 받은 텍스트 조각
   * @returns 파싱이 완료된 StreamAction 배열
   */
  append(chunk: string): StreamAction[];

  /**
   * 파서 상태 초기화
   * 새로운 스트리밍 세션을 시작할 때 호출
   */
  reset(): void;

  /**
   * 현재 버퍼 상태 반환 (디버깅용)
   * @returns 아직 파싱되지 않은 버퍼 내용
   */
  getBuffer(): string;

  /**
   * 파싱이 완료되었는지 여부
   * @returns 버퍼가 비어있고 모든 파싱이 완료되면 true
   */
  isComplete(): boolean;
}

/**
 * 파서 메타데이터
 */
export interface ParserMetadata {
  /** 파서 이름 */
  name: string;

  /** 파서 설명 */
  description: string;

  /** 지원하는 파일 확장자 */
  extensions: string[];

  /** 지원하는 MIME 타입 */
  mimeTypes?: string[];
}
