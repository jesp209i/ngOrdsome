export class Language {
  id: number;
  code: string;
  name: string;
  nativeName: string;

  public toString = (): string => {
    return `id: ${this.id}, code: ${this.code}, name: ${this.name}, nativeName:: ${this.nativeName}`;
  }
}
