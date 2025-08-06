import type { ITechOutDTO } from '@/server/app/dtos/tech/out';
import type { IPaginationDTO } from '../../dtos/pagination';
import type { IFilterDTO } from '../../dtos/filter';

export interface IGetAllTechsUseCase {
	execute(filters?: IFilterDTO): Promise<IPaginationDTO<ITechOutDTO>>;
}
