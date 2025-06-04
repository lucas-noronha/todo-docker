using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDo.Api.Dto;
using ToDo.Data;
using ToDo.Domain;

namespace ToDo.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly ILogger<Todo> _logger;
        private readonly TodoDb _db;

        public ToDoController(ILogger<Todo> logger, TodoDb db)
        {
            this._logger = logger;
            this._db = db;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var todos = _db.ToDo.ToList();
            _logger.LogInformation("Retrieved {Count} ToDo items", todos.Count);
            return Ok(todos);
        }
        [HttpPost]
        public IActionResult Post([FromBody] TaskDto dto)
        {
            if (dto == null)
            {
                return BadRequest("Invalid ToDo item.");
            }

            var entity = new Domain.Todo(dto.Title, dto.Description);
            _db.ToDo.Add(entity);
            _db.SaveChanges();
            _logger.LogInformation("ToDo item created: {Title}", dto.Title);
            return CreatedAtAction(nameof(Get), new { id = entity.Id }, entity);
        }
        [HttpPut("{id}")]
        public IActionResult Put(Guid id, [FromBody] TaskDto dto)
        {
            if (dto == null)
            {
                return BadRequest("Invalid ToDo item.");
            }
            var existingTodo = _db.ToDo.Find(id);
            if (existingTodo == null)
            {
                return NotFound();
            }
            existingTodo.Title = dto.Title;
            existingTodo.Task = dto.Description;
            _db.SaveChanges();
            _logger.LogInformation("ToDo item updated: {Id}", id);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var todo = _db.ToDo.Find(id);
            if (todo == null)
            {
                return NotFound();
            }
            _db.ToDo.Remove(todo);
            _db.SaveChanges();
            _logger.LogInformation("ToDo item deleted: {Id}", id);
            return NoContent();
        }
    }
}
