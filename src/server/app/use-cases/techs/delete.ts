export interface IDeleteTechUseCase {
  execute(id: string): Promise<void>;
}
