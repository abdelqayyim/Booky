import { addDays } from "date-fns";
export const dummySubscribedUsers = [
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1987654321",
    nextBooking: "2025-09-15T10:30:00.000Z",
    rating: 5,
    latestService: "Haircut",
    subscribedServices: ["Haircut"],
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+1098765432",
    nextBooking: null, // "No upcoming booking" → null for consistency
    rating: 3.8,
    latestService: "Shave",
    subscribedServices: ["Shave", "Haircut"],
  },
];

export const dummyServiceHistory = [
  {
    id: 1,
    userName: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    service: "Haircut",
    price: 34.99,
    date: "2025-09-10T14:00:00.000Z",
    rating: 4.5,
  },
  {
    id: 2,
    userName: "Jane Smith",
    email: "jane@example.com",
    phone: "+1987654321",
    service: "Haircut",
    price: 34.99,
    date: "2025-09-08T10:30:00.000Z",
    rating: 5,
  },
  {
    id: 3,
    userName: "Michael Brown",
    email: "michael@example.com",
    phone: "+1098765432",
    service: "Shave",
    price: 34.99,
    date: "2025-09-05T09:00:00.000Z",
    rating: 4,
  },
];
export const mockAppointments = [
  {
    id: 1,
    clientName: "Sarah Johnson",
    clientImage: "/api/placeholder/50/50",
    service: "Hair Coloring",
    time: "09:00 AM",
    date: new Date().toISOString(),
    duration: 90,
    phone: "(555) 123-4567",
    email: "sarah.johnson@email.com",
    location: "Downtown Salon - Chair 3",
    price: 150,
    notes:
      "Client prefers natural blonde highlights. Allergic to ammonia-based products.",
    status: "confirmed",
  },
  {
    id: 2,
    clientName: "Michael Chen",
    clientImage: "/api/placeholder/50/50",
    service: "Men's Haircut",
    time: "11:30 AM",
    date: new Date().toISOString(),
    duration: 45,
    phone: "(555) 987-6543",
    email: "m.chen@email.com",
    location: "Main Floor - Station 2",
    price: 35,
    notes: "Regular client - usual fade cut with trim on top.",
    status: "confirmed",
  },
  {
    id: 3,
    clientName: "Jessica Williams",
    clientImage: "/api/placeholder/50/50",
    service: "Manicure & Pedicure",
    time: "02:15 PM",
    date: new Date().toISOString(),
    duration: 75,
    phone: "(555) 456-7890",
    email: "jessica.w@email.com",
    location: "Nail Studio - Table 1",
    price: 65,
    notes: "Requested gel polish in coral pink. Has sensitive skin.",
    status: "confirmed",
  },
  {
    id: 4,
    clientName: "Michael Chen",
    clientImage: "/api/placeholder/50/50",
    service: "Men's Haircut",
    time: "05:30 PM",
    date: new Date().toISOString(),
    duration: 45,
    phone: "(555) 987-6543",
    email: "m.chen@email.com",
    location: "Main Floor - Station 2",
    price: 35,
    notes: "Follow-up appointment for touch-up.",
    status: "confirmed",
  },
  {
    id: 5,
    clientName: "Emily Davis",
    clientImage: "/api/placeholder/50/50",
    service: "Facial Treatment",
    time: "10:00 AM",
    date: addDays(new Date(), 1).toISOString(),
    duration: 60,
    phone: "(555) 321-0987",
    email: "emily.davis@email.com",
    location: "Spa Room A",
    price: 90,
    notes:
      "First-time client. Oily skin type, looking for deep cleansing treatment.",
    status: "pending",
  },
  {
    id: 6,
    clientName: "John Smith",
    clientImage: "/api/placeholder/50/50",
    service: "Beard Trim",
    time: "04:00 PM",
    date: addDays(new Date(), 1).toISOString(),
    duration: 30,
    phone: "(555) 654-3210",
    email: "john.smith@email.com",
    location: "Barber Station",
    price: 25,
    notes: "Prefers classic professional look. Regular maintenance trim.",
    status: "confirmed",
  },
];
// Mock data for schedules
export const mockSchedules = [
  {
    id: 1,
    day: "Monday",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
  },
  {
    id: 2,
    day: "Tuesday",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
  },
  {
    id: 3,
    day: "Wednesday",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
  },
  {
    id: 4,
    day: "Thursday",
    startTime: "09:00 AM",
    endTime: "07:00 PM",
  },
  {
    id: 5,
    day: "Friday",
    startTime: "09:00 AM",
    endTime: "07:00 PM",
  },
  {
    id: 6,
    day: "Saturday",
    startTime: "10:00 AM",
    endTime: "03:00 PM",
  },
];
export const mockDefaultSchedules = {
  userId: "user_001",
  weekStartDate: null, // null = default
  days: {
    Monday: [
      { startTime: "08:00", endTime: "10:00" },
      { startTime: "14:00", endTime: "17:00" },
    ],
    Tuesday: [{ startTime: "09:00", endTime: "17:00" }],
    Wednesday: [{ startTime: "09:00", endTime: "17:00" }],
    Thursday: [{ startTime: "10:00", endTime: "18:00" }],
    Friday: [{ startTime: "09:00", endTime: "15:00" }],
    Saturday: [],
    Sunday: [],
  },
};
export const mockOverrideSchedules = [
  {
    userId: "user_001",
    weekStartDate: "2025-06-08", // Sunday
    days: {
      Monday: [
        { startTime: "10:00", endTime: "12:00" }, // shortened
        { startTime: "13:00", endTime: "14:00" },
      ],
      Tuesday: [], // no availability (override default)
      Wednesday: [{ startTime: "10:00", endTime: "16:00" }],
      // Thursday to Sunday inherit default
    },
  },
];

export const monthlyData = {
  bookings: 21,
  completed: 14,
  reviews: 3.2,
  revenue: 2300
}

export const dummyDisputes = [
    {
      id: 'DSP-001',
      customer: 'Sarah Johnson',
      service: 'House Cleaning',
      serviceDate: '2024-09-15',
      amount: 120,
      status: 'open',
      priority: 'high',
      category: 'Service Quality',
      createdAt: '2024-09-16T10:30:00',
      lastUpdate: '2024-09-17T09:15:00',
      description: 'Customer claims cleaning was incomplete and wants full refund.',
      messages: [
        {
          id: 1,
          sender: 'customer',
          message: 'The cleaning service was not completed properly. Several rooms were barely touched.',
          timestamp: '2024-09-16T10:30:00',
          attachments: ['before.jpg', 'after.jpg']
        },
        {
          id: 2,
          sender: 'provider',
          message: 'I apologize for the inconvenience. Can you please specify which areas were not cleaned to your satisfaction?',
          timestamp: '2024-09-16T14:20:00'
        }
      ]
    },
    {
      id: 'DSP-002',
      customer: 'Mike Chen',
      service: 'Haircut',
      serviceDate: '2024-09-14',
      amount: 45,
      status: 'under_review',
      priority: 'medium',
      category: 'Payment Issue',
      createdAt: '2024-09-15T16:45:00',
      lastUpdate: '2024-09-16T11:30:00',
      description: 'Payment dispute - customer claims double charge.',
      messages: [
        {
          id: 1,
          sender: 'customer',
          message: 'I was charged twice for the same service. Please refund the duplicate charge.',
          timestamp: '2024-09-15T16:45:00'
        }
      ]
    },
    {
      id: 'DSP-003',
      customer: 'Emma Davis',
      service: 'Lawn Care',
      serviceDate: '2024-09-12',
      amount: 85,
      status: 'resolved',
      priority: 'low',
      category: 'Scheduling',
      createdAt: '2024-09-13T09:20:00',
      lastUpdate: '2024-09-14T15:45:00',
      description: 'Provider arrived 2 hours late, customer requested partial refund.',
      messages: []
    }
  ];