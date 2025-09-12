import React, { useState, useEffect, useMemo } from 'react';
import Toggle from '../../components/Toggle';
import { FILTER_SVG, STAR_EMPTY, STAR_HALF, STAR_FULL } from '../constants';
import Tooltip from "@mui/material/Tooltip";

const dummyUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    nextBooking: '2025-09-20 14:00',
    rating: 4.5,
    latestService: "Haircut",
    subscribed: false,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1987654321',
    nextBooking: '2025-09-15 10:30',
    rating: 5,
    latestService: "Haircut",
    subscribed: true,
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '+1098765432',
    nextBooking: 'No upcoming booking',
    rating: 3.8,
    latestService: "Shave",
    subscribed: true,
  },
];

const serviceHistory = [
  {
    id: 1,
    userName: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    service: 'Haircut',
    date: '2025-09-10 14:00',
    rating: 4.5,
  },
  {
    id: 2,
    userName: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1987654321',
    service: 'Haircut',
    date: '2025-09-08 10:30',
    rating: 5,
  },
  {
    id: 3,
    userName: 'Michael Brown',
    email: 'michael@example.com',
    phone: '+1098765432',
    service: 'Shave',
    date: '2025-09-05 09:00',
    rating: 4,
  },
];

const ProviderUsersPage = () => {
  const [currentOption, setCurrentOption] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [appliedServices, setAppliedServices] = useState([]);


  const options = useMemo(() => [
    { title: 'History', onClick: () => setCurrentOption('History') },
    { title: 'Subscribed', onClick: () => setCurrentOption('Subscribed') },
  ], []);
  const [sortOption, setSortOption] = useState(null); 
  const [displayFilterOptions, setDisplayFiletOptions] = useState(false);
  const [filters, setFilters] = useState({
  name: '',           // For name search
  fromDate: '',       // Start date
  toDate: '',         // End date
  rating: 0,          // Min rating (can be 0.5 steps)
  services: [],       // Array of selected services (e.g. ['Haircut', 'Shave'])
});

  useEffect(() => {
    setCurrentOption(options[0].title);
  }, [options]);

  // Derive service types based on current option
  const serviceTypes = useMemo(() => {
    const source =
      currentOption === 'History'
        ? serviceHistory.map((entry) => entry.service)
        : dummyUsers
            .filter((user) => currentOption === 'Subscribed' ? user.subscribed : true)
            .map((user) => user.latestService);

    return Array.from(new Set(source));
  }, [currentOption]);



  const filterItems = [
  {
    label: 'Name',
    onClick: () => setSortOption('name'),
  },
  {
    label: 'Date',
    onClick: () => setSortOption('date'),
  },
  {
    label: 'Rating',
    onClick: () => setSortOption('rating'),
  },
  ...serviceTypes.map((service) => ({
    label: (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={service}
          checked={selectedServices.includes(service)}
          onChange={(e) => {
            setSelectedServices((prev) =>
              e.target.checked
                ? [...prev, service]
                : prev.filter((s) => s !== service)
            );
          }}
          onClick={(e) => e.stopPropagation()}
        />
        <label htmlFor={service}>{service}</label>
      </div>
    ),
    onClick: () => {},
  })),
  ];
  
const StarRatingFilter = () => {
  const handleStarClick = (value) => {
    setFilters({ ...filters, rating: value });
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      let starIcon;

      if (i <= Math.floor(filters.rating)) {
        starIcon = STAR_FULL;
      } else if (filters.rating >= i - 0.5) {
        starIcon = STAR_HALF;
      } else {
        starIcon = STAR_EMPTY;
      }

      stars.push(
        <span
          key={i}
          className="cursor-pointer w-6 h-6 text-yellow-300 hover:text-yellow-400"
          onClick={() => handleStarClick(i)}
          onContextMenu={(e) => {
            e.preventDefault();
            handleStarClick(i - 0.5);
          }}
        >
          {starIcon}
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Min Rating:</span>
      <div className="flex">{renderStars()}</div>
    </div>
  );
};

  // Filter logic
  const filteredUsers = dummyUsers
  .filter((user) => {
    const isSubscribedCheck =
      currentOption === 'Subscribed' ? user.subscribed : true;
    const isServiceMatch =
      appliedServices.length > 0
        ? appliedServices.includes(user.latestService)
        : true;
    return isSubscribedCheck && isServiceMatch;
  })
  .sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'date') {
      return new Date(a.nextBooking) - new Date(b.nextBooking);
    } else if (sortOption === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

const filteredHistory = serviceHistory
  .filter((entry) =>
    appliedServices.length > 0
      ? appliedServices.includes(entry.service)
      : true
  )
  .sort((a, b) => {
    if (sortOption === 'name') {
      return a.userName.localeCompare(b.userName);
    } else if (sortOption === 'date') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOption === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  // Horizontal Filter Bar Component
const HorizontalFilter = () => (
  <div className="text-black p-4 rounded-lg shadow-md mb-6 flex flex-col gap-4 text-white">
    {/* Search by Name */}
    <input
      type="text"
      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black outline-none"
      placeholder="Search By Name"
    />

    {/* Date Range Filter */}
    <div className="flex gap-2 items-center">
      <input
        type="date"
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-gray-300">to</span>
      <input
        type="date"
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      {/* Rating Filter */}
        <StarRatingFilter/>
    </div>
    {/* Services Selection */}
    <div className="flex flex-row gap-2">
  {serviceTypes.map((service) => (
    <button
            className={` w-fit px-4 py-2 rounded-lg border flex items-center gap-2 ${
              filters.services.shave 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            // onClick={() => setFilters({...filters, services: {...filters.services, shave: !filters.services.shave}})}
          >
            {/* <User className="h-4 w-4" /> */}
            {service}
          </button>
  ))}
    </div>
    
    {/* Footer For the Filter */}
    <div className='flex flex-row gap-2'>
      <button
            className={` w-fit px-4 py-2 rounded-lg border flex items-center gap-2 text-black`}
            // onClick={() => setFilters({...filters, services: {...filters.services, shave: !filters.services.shave}})}
          >
            {/* <User className="h-4 w-4" /> */}
            Reset
      </button>
      <button
            className={` w-fit px-4 py-2 rounded-lg border flex items-center gap-2 text-black`}
            // onClick={() => setFilters({...filters, services: {...filters.services, shave: !filters.services.shave}})}
          >
            {/* <User className="h-4 w-4" /> */}
            Apply
          </button>
    </div>
  </div>
);



  return (
    <div className='h-full flex flex-col pl-[10px] pt-[5px] bg-transparent w-full'>
      {/* Page Title + Toggle + Filter */}
      <div className='flex flex-row items-center w-auto mb-4'>
        <h1 className='text-[45px] font-bold'>Users</h1>

        <div className='flex flex-row items-center ml-2'>
          <Toggle
            options={options}
            height='h-[40px]'
            width='w-[220px]'
            currentValue={currentOption}
          />
          <Tooltip title="Filter" placement="bottom">
                <div className='ml-2 p-2 rounded-full hover:bg-gray-200 transition cursor-pointer' onClick={()=>setDisplayFiletOptions(prev=>!prev)}>
                  {FILTER_SVG}
                </div>
              </Tooltip>
        </div>
      </div>

      {displayFilterOptions && <HorizontalFilter />}


      {/* Table Section */}
      <div className='w-full mr-[10px] overflow-x-auto'>
        <table className='min-w-full bg-white shadow rounded-md'>
          <thead>
            <tr className='bg-gray-100 text-left'>
              <th className='py-3 px-4'>Name</th>
              <th className='py-3 px-4'>Email / Phone</th>
              <th className='py-3 px-4'>Service</th>
              <th className='py-3 px-4'>
                {currentOption === 'History' ? 'Date of Service' : 'Next Scheduled Booking'}
              </th>
              <th className='py-3 px-4'>Rating</th>
            </tr>
          </thead>
          <tbody>
            {currentOption === 'History'
              ? filteredHistory.map((entry) => (
                  <tr key={entry.id} className='border-b hover:bg-gray-50'>
                    <td className='py-3 px-4 font-medium'>{entry.userName}</td>
                    <td className='py-3 px-4 text-sm'>
                      <div>{entry.email}</div>
                      <div className='text-gray-500'>{entry.phone}</div>
                    </td>
                    <td className='py-3 px-4 text-sm'>{entry.service}</td>
                    <td className='py-3 px-4 text-sm'>{entry.date}</td>
                    <td className='py-3 px-4'>
                      <span className='inline-block bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded'>
                        {entry.rating} ★
                      </span>
                    </td>
                  </tr>
                ))
              : filteredUsers.map((user) => (
                  <tr key={user.id} className='border-b hover:bg-gray-50'>
                    <td className='py-3 px-4 font-medium'>{user.name}</td>
                    <td className='py-3 px-4 text-sm'>
                      <div>{user.email}</div>
                      <div className='text-gray-500'>{user.phone}</div>
                    </td>
                    <td className='py-3 px-4 text-sm'>{user.latestService}</td>
                    <td className='py-3 px-4 text-sm'>{user.nextBooking}</td>
                    <td className='py-3 px-4'>
                      <span className='inline-block bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded'>
                        {user.rating} ★
                      </span>
                    </td>
                  </tr>
                ))}
            {(currentOption === 'History' ? filteredHistory.length === 0 : filteredUsers.length === 0) && (
              <tr>
                <td colSpan={5} className='py-6 px-4 text-center text-gray-500'>
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderUsersPage;
