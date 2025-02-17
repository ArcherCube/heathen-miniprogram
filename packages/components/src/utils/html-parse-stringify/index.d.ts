declare namespace HtmlParseStringify {
  export type TagNode = {
    attrs: { [attr: string]: string };
    children: ASTNode[];
    name: string;
    type: 'tag';
    voidElement: boolean;
  };

  export type TextNode = {
    content: string;
    type: 'text';
  };

  export type ComponentNode = {
    attrs: { [attr: string]: string };
    children: ASTNode[];
    name: string;
    type: 'component';
    voidElement: boolean;
  };

  export type ASTNode = ComponentNode | TagNode | TextNode;

  export function parse(htmlString: string, options?: any): ASTNode[];
  export function stringify(AST: ASTNode[]): string;
}

export = HtmlParseStringify;
