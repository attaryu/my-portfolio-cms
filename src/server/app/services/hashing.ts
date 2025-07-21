export interface IHashing {
  generateHash(text: string): Promise<string>;
  verifyHash(text: string, hash: string): Promise<boolean>; 
}
