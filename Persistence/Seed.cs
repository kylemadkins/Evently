using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedAsync(DataContext context)
        {
            if (context.Events.Any()) return;

            var events = new List<Event>
            {
                new Event
                {
                    Title = "Past Event 1",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Description = "An event that happened 2 months ago",
                    Category = "drinks",
                    City = "Fort Myers",
                    Venue = "Downtown Social House"
                },
                new Event
                {
                    Title = "Past Event 2",
                    Date = DateTime.UtcNow.AddMonths(-1),
                    Description = "An event that happened 1 month ago",
                    Category = "culture",
                    City = "Tampa",
                    Venue = "Salvador Dalí Museum",
                },
                new Event
                {
                    Title = "Future Event 1",
                    Date = DateTime.UtcNow.AddMonths(1),
                    Description = "An event 1 month from now",
                    Category = "culture",
                    City = "Miami",
                    Venue = "Museum of Graffiti",
                },
                new Event
                {
                    Title = "Future Event 2",
                    Date = DateTime.UtcNow.AddMonths(2),
                    Description = "An event 2 months from now",
                    Category = "music",
                    City = "Orlando",
                    Venue = "Amway Center",
                },
                new Event
                {
                    Title = "Future Event 3",
                    Date = DateTime.UtcNow.AddMonths(3),
                    Description = "An event 3 months from now",
                    Category = "drinks",
                    City = "Sarasota",
                    Venue = "O'Leary's Bar & Grill",
                },
            };

            await context.Events.AddRangeAsync(events);
            await context.SaveChangesAsync();
        }
    }
}
