export interface IPaginationCallbackParameters {
  startCallbackData: string;
  prevCallbackData: string;
  nextCallbackData: string;
  endCallbackData: string;
  currentPage: number;
  totalPages: number;
  query: string;
}
