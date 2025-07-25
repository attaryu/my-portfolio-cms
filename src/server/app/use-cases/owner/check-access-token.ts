export interface ICheckOwnerAccessTokenUseCase {
	execute(accessToken: string): Promise<boolean>;
}
