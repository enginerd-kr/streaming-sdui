import type { StreamAction, UINode } from '../types';
import type { IStreamParser } from './base-parser';

/**
 * DSL 스트리밍 파서
 *
 * 문법:
 * ComponentType
 *   @propName: value
 *   @propName2: value2
 *   ChildComponent
 *     @prop: value
 *
 * 예시:
 * Card
 *   @className: w-full
 *   CardHeader
 *     CardTitle: Hello World
 *   CardContent
 *     @padding: 4
 *     "Some text content"
 *
 * 특징:
 * - 들여쓰기로 중첩 구조 표현 (2칸 권장)
 * - @로 시작하는 라인은 속성
 * - 콜론(:) 뒤에 텍스트가 있으면 children으로 인라인 추가
 * - 따옴표로 감싼 텍스트는 텍스트 노드
 * - // 로 시작하는 줄은 주석
 */
export class DSLParser implements IStreamParser {
  private lineBuffer: string = '';
  private indentStack: number[] = [-1]; // 루트 레벨은 -1
  private nodeStack: UINode[] = [];
  private rootNode: UINode | null = null;
  private idCounter = 0;
  private completedNodes = new Set<string>();

  append(chunk: string): StreamAction[] {
    this.lineBuffer += chunk;
    const actions: StreamAction[] = [];

    // 개행 문자로 라인 분리
    const lines = this.lineBuffer.split('\n');

    // 마지막 라인은 불완전할 수 있으므로 버퍼에 유지
    this.lineBuffer = lines.pop() || '';

    for (const line of lines) {
      const action = this.parseLine(line);
      if (action) {
        actions.push(action);
      }
    }

    return actions;
  }

  private parseLine(line: string): StreamAction | null {
    // 빈 줄이나 주석 무시
    if (!line.trim() || line.trim().startsWith('//')) {
      return null;
    }

    const indent = this.getIndent(line);
    const content = line.trim();

    // 들여쓰기 감소 = 부모로 올라감
    while (indent <= this.indentStack[this.indentStack.length - 1] && this.indentStack.length > 1) {
      this.indentStack.pop();
      this.nodeStack.pop();
    }

    // 라인 타입 판단
    if (content.startsWith('@')) {
      // 속성 라인: @propName: value
      return this.parsePropertyLine(content);
    } else if (content.startsWith('"') || content.startsWith("'")) {
      // 텍스트 콘텐츠: "text" or 'text'
      return this.parseTextLine(content);
    } else {
      // 컴포넌트 라인
      return this.parseComponentLine(content, indent);
    }
  }

  private parsePropertyLine(line: string): StreamAction | null {
    // @propName: value 파싱
    const match = line.match(/^@([\w-]+):\s*(.+)$/);
    if (!match) {
      console.warn('Invalid property line:', line);
      return null;
    }

    const [, propName, value] = match;
    const currentNode = this.nodeStack[this.nodeStack.length - 1];

    if (!currentNode) {
      console.warn('Property line without parent node:', line);
      return null;
    }

    // props 초기화
    if (!currentNode.props) {
      currentNode.props = {};
    }

    // 속성 업데이트
    currentNode.props[propName] = this.parseValue(value);

    // 속성 업데이트 액션
    return {
      action: 'update',
      componentId: currentNode.id,
      updates: {
        props: currentNode.props,
      },
    };
  }

  private parseTextLine(line: string): StreamAction | null {
    // 따옴표 제거
    const text = line.slice(1, -1);
    const parentNode = this.nodeStack[this.nodeStack.length - 1];

    if (!parentNode) {
      console.warn('Text line without parent node:', line);
      return null;
    }

    // children 초기화
    if (!parentNode.children) {
      parentNode.children = [];
    }

    parentNode.children.push(text);

    // children 업데이트 액션
    return {
      action: 'update',
      componentId: parentNode.id,
      updates: {
        children: parentNode.children,
      },
    };
  }

  private parseComponentLine(line: string, indent: number): StreamAction | null {
    // "ComponentType: Text" 형태 처리
    const colonMatch = line.match(/^([\w-]+):\s*(.+)$/);

    let node: UINode;

    if (colonMatch) {
      const [, type, text] = colonMatch;
      node = {
        id: this.generateId(),
        type,
        children: [text],
      };
    } else {
      // "ComponentType" 형태
      node = {
        id: this.generateId(),
        type: line,
      };
    }

    // 루트 노드인 경우
    if (this.nodeStack.length === 0) {
      this.rootNode = node;
      this.nodeStack.push(node);
      this.indentStack.push(indent);

      return {
        action: 'create',
        component: node,
      };
    }

    // 자식 노드인 경우
    const parentNode = this.nodeStack[this.nodeStack.length - 1];
    this.nodeStack.push(node);
    this.indentStack.push(indent);

    return {
      action: 'append',
      parentId: parentNode.id,
      component: node,
    };
  }

  private getIndent(line: string): number {
    const match = line.match(/^(\s*)/);
    return match ? match[1].length : 0;
  }

  private parseValue(value: string): any {
    const trimmed = value.trim();

    // Boolean
    if (trimmed === 'true') return true;
    if (trimmed === 'false') return false;

    // Null/Undefined
    if (trimmed === 'null') return null;
    if (trimmed === 'undefined') return undefined;

    // Number
    if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed, 10);
    if (/^-?\d+\.\d+$/.test(trimmed)) return parseFloat(trimmed);

    // Object/Array (JSON)
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return trimmed;
      }
    }

    // String (따옴표 제거)
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return trimmed.slice(1, -1);
    }

    // 그 외는 문자열로
    return trimmed;
  }

  private generateId(): string {
    return `dsl-${this.idCounter++}`;
  }

  reset(): void {
    this.lineBuffer = '';
    this.indentStack = [-1];
    this.nodeStack = [];
    this.rootNode = null;
    this.idCounter = 0;
    this.completedNodes.clear();
  }

  getBuffer(): string {
    return this.lineBuffer;
  }

  isComplete(): boolean {
    return this.lineBuffer.trim() === '' && this.nodeStack.length === 0;
  }
}
