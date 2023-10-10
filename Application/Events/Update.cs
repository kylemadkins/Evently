using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Update
    {
        public class Command : IRequest
        {
            public Event Event { get; set; } = null!;
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Event).SetValidator(new EventValidator());
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.Event != null)
                {
                    var evt = await _context.Events.FindAsync(request.Event.Id);
                    if (evt != null)
                    {
                        _mapper.Map(request.Event, evt);
                    }
                    await _context.SaveChangesAsync();
                }
                return;
            }
        }
    }
}
