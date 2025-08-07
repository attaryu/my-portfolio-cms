import type { IFilterDTO } from '../../dtos/filter';
import type { IPaginationDTO } from '../../dtos/pagination';
import type { IProjectOutDTO } from '../../dtos/project/out';

export interface IGetAllProjectsUseCase {
	execute(filters?: IFilterDTO): Promise<IPaginationDTO<IProjectOutDTO>>;
}
