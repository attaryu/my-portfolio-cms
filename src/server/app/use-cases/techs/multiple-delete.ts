export interface IMultipleDeleteTechsUseCase {
	execute(ids: string[]): Promise<void>;
}
