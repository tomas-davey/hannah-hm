import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Target, MapPin } from 'lucide-react';
import trainingData from './trainingData.json';

const TrainingCalendarApp = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // 0 = September, 1 = October

  const months = ['September', 'October'];

  const generateCalendar = (monthIndex) => {
    const startDate = new Date(2025, monthIndex === 0 ? 8 : 9, 1);
    const endDate = new Date(2025, monthIndex === 0 ? 8 : 9, monthIndex === 0 ? 30 : 12); // Sept=30, Oct=12

    const days = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getWorkoutTypeColor = (type) => {
    const colors = {
      rest: 'bg-gray-100 text-gray-600',
      speed: 'bg-red-100 text-red-800',
      tempo: 'bg-orange-100 text-orange-800',
      recovery: 'bg-green-100 text-green-800',
      long: 'bg-blue-100 text-blue-800',
      optional: 'bg-purple-100 text-purple-800',
      race: 'bg-yellow-200 text-yellow-900 font-bold'
    };
    return colors[type] || 'bg-gray-100 text-gray-600';
  };

  const getWorkoutIcon = (type) => {
    switch(type) {
      case 'speed': return '⚡';
      case 'tempo': return '🔥';
      case 'recovery': return '🌱';
      case 'long': return '🏔️';
      case 'optional': return '?';
      case 'race': return '🏁';
      default: return '😴';
    }
  };

  const calendarDays = generateCalendar(currentMonthIndex);

  const goPrevMonth = () => setCurrentMonthIndex(Math.max(0, currentMonthIndex - 1));
  const goNextMonth = () => setCurrentMonthIndex(Math.min(1, currentMonthIndex + 1));

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Hannah's Half Marathon Training Calendar</h1>
            <p className="text-left text-blue-100">6-Week Sub-2 Hour Plan • Target Race: October 12th</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={goPrevMonth} disabled={currentMonthIndex === 0}>
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={goNextMonth} disabled={currentMonthIndex === months.length - 1}>
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Calendar View */}
          <div className="flex-1 p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {months[currentMonthIndex]} 2025
            </h2>
            <div className="grid grid-cols-7 gap-1">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}

              {calendarDays.map((date, idx) => {
                const dateKey = formatDate(date);
                const workout = trainingData[dateKey];
                const isSelected = selectedDate === dateKey;

                // Highlight today
                const today = new Date();
                const formattedToday = formatDate(today);
                const isToday = dateKey === formattedToday;

                // Add empty cells for first week
                const dayOfWeek = (calendarDays[0].getDay() + 6) % 7;
                const emptyCells = idx === 0 ? Array.from({ length: dayOfWeek }, (_, i) => (
                  <div key={`empty-${i}`} className="p-2"></div>
                )) : [];

                return [
                  ...emptyCells,
                  <div
                    key={dateKey}
                    className={`p-1 cursor-pointer rounded-lg transition-all hover:scale-105 ${
                      isSelected ? 'ring-2 ring-blue-500' : ''
                    } ${isToday ? 'ring-2 ring-green-400' : ''}`}
                    onClick={() => setSelectedDate(dateKey)}
                  >
                    <div className="text-sm font-medium text-center mb-1">{date.getDate()}</div>
                    {workout && (
                      <div className={`text-xs p-1 rounded text-center ${getWorkoutTypeColor(workout.type)}`}>
                        <div className="mb-1">{getWorkoutIcon(workout.type)}</div>
                        <div className="truncate">{workout.title}</div>
                        {workout.distance && <div className="text-xs opacity-75">{workout.distance}</div>}
                      </div>
                    )}
                  </div>
                ];
              })}
            </div>

            {/* Legend */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-3">Workout Types</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-red-100"></span>⚡ Speed Work</div>
                <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-orange-100"></span>🔥 Tempo Run</div>
                <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-green-100"></span>🌱 Recovery</div>
                <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-blue-100"></span>🏔️ Long Run</div>
                <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-purple-100"></span>? Optional</div>
                <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-yellow-200"></span>🏁 Race Day</div>
              </div>
            </div>
          </div>

          {/* Workout Details Panel */}
          <div className="w-96 bg-gray-100 p-6 border-l">
            {selectedDate ? (
              trainingData[selectedDate] ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">
                      {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h3>
                  </div>
                  <div className={`p-4 rounded-lg ${getWorkoutTypeColor(trainingData[selectedDate].type)}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{getWorkoutIcon(trainingData[selectedDate].type)}</span>
                      <h4 className="font-semibold text-lg">{trainingData[selectedDate].title}</h4>
                    </div>
                    {trainingData[selectedDate].distance && (
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{trainingData[selectedDate].distance}</span>
                      </div>
                    )}
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold mb-2 text-gray-700">Workout Description:</h5>
                    <p className="text-gray-600 mb-3">{trainingData[selectedDate].description}</p>
                    {trainingData[selectedDate].details && (
                      <>
                        <h5 className="font-semibold mb-2 text-gray-700">Details & Tips:</h5>
                        <p className="text-gray-600 text-sm">{trainingData[selectedDate].details}</p>
                      </>
                    )}
                  </div>
                  {trainingData[selectedDate].type !== 'rest' && (
                    <div className="bg-white p-4 rounded-lg">
                      <h5 className="font-semibold mb-3 text-gray-700">🎯 Pace Guide:</h5>
                      <div className="space-y-2 text-sm">
                        <div><strong>Easy:</strong> 6:15-6:45/km</div>
                        <div><strong>Steady:</strong> 5:50-6:10/km</div>
                        <div><strong>Half Marathon:</strong> 5:35-5:40/km</div>
                        <div><strong>Tempo:</strong> 5:15-5:30/km</div>
                        <div><strong>Interval:</strong> 4:50-5:10/km</div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No workout scheduled for this day</p>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">Click on a date to see workout details</p>
                <p className="text-sm text-gray-400">Green ring = Today | Blue ring = Selected</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCalendarApp;
