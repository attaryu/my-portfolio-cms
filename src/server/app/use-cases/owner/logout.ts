export interface IOwnerLogoutUseCase {
  execute(refreshToken: string): Promise<void>;
}