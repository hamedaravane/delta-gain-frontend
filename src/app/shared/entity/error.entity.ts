export interface ErrorEntity {
  code: number;
  status: string;
  message: string;
}

export function getErrorApi(err: any) {
  return err as ErrorEntity;
}

export function getErrorMessage(err: any) {
  const error = getErrorApi(err);
  return error.message;
}
