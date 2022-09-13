namespace API.Helpers
{
    public class PaginationHeader
    {
        public PaginationHeader(int currentpage, int itemsPerPage, int totalItems, int totalPage)
        {
            Currentpage = currentpage;
            ItemsPerPage = itemsPerPage;
            TotalItems = totalItems;
            TotalPage = totalPage;
        }

        public int Currentpage { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPage { get; set; }
    }
}
