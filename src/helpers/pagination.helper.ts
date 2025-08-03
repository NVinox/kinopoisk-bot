export class PaginationHelper {
  static getProgress(currentPage: number, totalPages: number): string {
    return `Страница ${currentPage} / ${totalPages}`;
  }
}
