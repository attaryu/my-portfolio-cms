import { ITopProjectOutDTO } from '../../dtos/project/top-project-out';

export interface IGetTopProjectUseCase {
	execute(): Promise<ITopProjectOutDTO[]>;
}
