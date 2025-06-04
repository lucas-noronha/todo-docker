namespace ToDo.Domain
{
    public class Todo
    {
        private Todo()
        {}
        public Todo(string title, string description)
        {
            Id = Guid.NewGuid();
            Title = title;
            Task = description;
            CreatedAd = DateTime.UtcNow;
            Completed = false;
        }
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Task { get; set; }

        public DateTime CreatedAd { get; set; }

        public bool Completed { get; set; }
    }
}
