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
        }
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Task { get; set; }
    }
}
