export module './fixer' {
  class Fixer {
    constructor(path: string, resolution: number): Fixer;

    process: () => Promise<string>;
  }

  export default Fixer;
}
