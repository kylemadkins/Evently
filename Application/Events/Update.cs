using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Update
    {
        public class Command : IRequest<Result<Unit?>>
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

        public class Handler : IRequestHandler<Command, Result<Unit?>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit?>> Handle(Command request, CancellationToken cancellationToken)
            {
                var evt = await _context.Events.FindAsync(request.Event.Id);
                if (evt == null) return Result<Unit?>.Success(null);
                _mapper.Map(request.Event, evt);
                await _context.SaveChangesAsync();
                return Result<Unit?>.Success(Unit.Value);
            }
        }
    }
}
