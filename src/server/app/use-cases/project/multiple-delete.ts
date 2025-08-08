export interface IMultipleDeleteProjectsUseCase {
	execute(projectIds: string[]): Promise<void>;
}
