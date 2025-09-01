import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Target, MapPin } from 'lucide-react';
import trainingData from './trainingData.json'

const TrainingCalendarApp = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Training plan data
//   const trainingData = {
//     // Week 1 - Sept 2-8
//     '2024-09-02': { type: 'rest', title: 'Rest Day', description: 'Complete rest or gentle walk' },
//     '2024-09-03': { 
//       type: 'speed', 
//       title: 'Speed Play', 
//       distance: '6.5km',
//       description: '2km easy warm-up (6:15-6:30/km) + 6 × 100m strides + 2km easy cool-down',
//       details: 'Gentle pick-ups to feel fast again. Build from easy pace to about 5:00/km over 100m. Walk back for full recovery.'
//     },
//     '2024-09-04': { 
//       type: 'optional', 
//       title: 'Optional Easy Run', 
//       distance: '4km',
//       description: '4km easy at 6:15-6:30/km',
//       details: 'Only if feeling good. Keep it conversational.'
//     },
//     '2024-09-05': { 
//       type: 'tempo', 
//       title: 'First Tempo Run', 
//       distance: '8km',
//       description: '2km warm-up + 3 × 1km tempo (5:20-5:30/km) + 2km cool-down',
//       details: 'Build confidence at faster paces. 2-minute jog recovery between intervals.'
//     },
//     '2024-09-06': { type: 'rest', title: 'Rest Day', description: 'Complete rest day' },
//     '2024-09-07': { 
//       type: 'recovery', 
//       title: 'Recovery Run', 
//       distance: '5km',
//       description: '5km at 6:00-6:30/km',
//       details: 'Keep it chatty and relaxed - active recovery only.'
//     },
//     '2024-09-08': { 
//       type: 'long', 
//       title: 'Long Run Rebuild', 
//       distance: '16km',
//       description: '16km at easy pace (6:00-6:30/km)',
//       details: 'Focus on time on feet, not speed. Practice drinking during the run.'
//     },
    
//     // Week 2 - Sept 9-15
//     '2024-09-09': { type: 'rest', title: 'Rest Day', description: 'Complete rest day' },
//     '2024-09-10': { 
//       type: 'speed', 
//       title: 'Track Session', 
//       distance: '8km',
//       description: '2km warm-up + 6 × 400m (5:00-5:10/km) + 2km cool-down',
//       details: 'Remind your legs what speed feels like. 90 seconds walking/jogging recovery.'
//     },
//     '2024-09-11': { 
//       type: 'optional', 
//       title: 'Optional Easy Run', 
//       distance: '5km',
//       description: '5km easy pace',
//       details: 'Optional recovery run if feeling good.'
//     },
//     '2024-09-12': { 
//       type: 'tempo', 
//       title: 'Marathon Pace Run', 
//       distance: '9km',
//       description: '2km warm-up + 5km marathon pace (5:45-6:00/km) + 2km cool-down',
//       details: 'Should feel "comfortably firm" - sustainable for ages.'
//     },
//     '2024-09-13': { type: 'rest', title: 'Rest Day', description: 'Complete rest day' },
//     '2024-09-14': { 
//       type: 'recovery', 
//       title: 'Easy Recovery', 
//       distance: '6km',
//       description: '6km easy pace - keep those legs loose!',
//       details: 'Active recovery run.'
//     },
//     '2024-09-15': { 
//       type: 'long', 
//       title: 'Long Run with Finish', 
//       distance: '16km',
//       description: '13km easy + 3km at half marathon pace (5:35-5:41/km)',
//       details: 'Practice what race pace feels like when a bit tired.'
//     },

//     // Week 3 - Sept 16-22 (Peak Week)
//     '2024-09-16': { type: 'rest', title: 'Rest Day', description: 'Complete rest day' },
//     '2024-09-17': { 
//       type: 'speed', 
//       title: 'Longer Intervals', 
//       distance: '8km',
//       description: '2km warm-up + 5 × 800m (4:55-5:10/km) + 2km cool-down',
//       details: 'Your hardest session - you\'ve got this! 2 minutes recovery between each.'
//     },
//     '2024-09-18': { 
//       type: 'optional', 
//       title: 'Optional Easy Run', 
//       distance: '6km',
//       description: '6km easy pace',
//       details: 'Optional recovery run.'
//     },
//     '2024-09-19': { 
//       type: 'tempo', 
//       title: 'Extended Tempo', 
//       distance: '11km',
//       description: '2km warm-up + 7km tempo (5:15-5:30/km) + 2km cool-down',
//       details: 'Build that lactate threshold - one continuous effort.'
//     },
//     '2024-09-20': { type: 'rest', title: 'Rest Day', description: 'Complete rest day' },
//     '2024-09-21': { 
//       type: 'recovery', 
//       title: 'Recovery Spin', 
//       distance: '6km',
//       description: '6km super easy - gentle leg loosener',
//       details: 'Think of this as a gentle leg loosener.'
//     },
//     '2024-09-22': { 
//       type: 'long', 
//       title: 'Long Run Race Simulation', 
//       distance: '18km',
//       description: '4km easy + 10km at half marathon pace + 4km easy',
//       details: 'Big confidence builder - you\'re running more than half the race distance at goal pace!'
//     },

//     // Week 4 - Sept 23-29
//     '2024-09-23': { type: 'rest', title: 'Rest Day', description: 'Complete rest day' },
//     '2024-09-24': { 
//       type: 'speed', 
//       title: 'Race Pace Repeats', 
//       distance: '8km',
//       description: '2km warm-up + 4 × 1000m HMP (5:35-5:41/km) + 2km cool-down',
//       details: 'Make race pace feel natural and relaxed. 90 seconds easy jog recovery.'
//     },
//     '2024-09-25': { 
//       type: 'optional', 
//       title: 'Optional Easy Run', 
//       distance: '5km',
//       description: '5km easy pace',
//       details: 'Optional recovery run.'
//     },
//     '2024-09-26': { 
//       type: 'tempo', 
//       title: 'Tempo Blocks', 
//       distance: '9km',
//       description: '1.5km warm-up + 3 × 2km tempo + 1.5km cool-down',
//       details: 'Building strength at comfortably hard effort. 3 minutes easy between.'
//     },
//     '2024-09-27': { type: 'rest', title: 'Rest Day', description: 'Complete rest day' },
//     '2024-09-28': { 
//       type: 'recovery', 
//       title: 'Short and Sweet', 
//       distance: '5km',
//       description: '5km easy pace',
//       details: 'Keep it short and relaxed.'
//     },
//     '2024-09-29': { 
//       type: 'long', 
//       title: 'Final Long Pace Practice', 
//       distance: '16km',
//       description: '6km easy + 6km HMP + 4km easy',
//       details: 'Last big race pace practice - make it count!'
//     },

//     // Week 5 - Sept 30-Oct 6 (Taper)
//     '2024-09-30': { type: 'rest', title: 'Rest Day', description: 'Complete rest day' },
//     '2024-10-01': { 
//       type: 'speed', 
//       title: 'Speed Maintenance', 
//       distance: '6km',
//       description: '2km warm-up + 6 × 200m interval pace + 2km cool-down',
//       details: 'Keep legs sharp but don\'t tire them out. Full recovery between.'
//     },
//     '2024-10-02': { 
//       type: 'optional', 
//       title: 'Optional Easy Run', 
//       distance: '4km',
//       description: '4km easy pace (or skip if tired)',
//       details: 'Optional - skip entirely if feeling tired.'
//     },
//     '2024-10-03': { 
//       type: 'tempo', 
//       title: 'Final Race Pace Hit', 
//       distance: '8km',
//       description: '2.5km warm-up + 3km HMP + 2.5km cool-down',
//       details: 'Your last race pace session - trust your fitness!'
//     },
//     '2024-10-04': { type: 'rest', title: 'Rest Day', description: 'Complete rest day' },
//     '2024-10-05': { 
//       type: 'recovery', 
//       title: 'Gentle Mover', 
//       distance: '4km',
//       description: '4km easy pace',
//       details: 'Keep it gentle and relaxed.'
//     },
//     '2024-10-06': { 
//       type: 'long', 
//       title: 'Reduced Long Run', 
//       distance: '12km',
//       description: '12km at easy pace',
//       details: 'Maintain routine but reduce load. You should feel fresh and ready.'
//     },

//     // Week 6 - Oct 7-12 (Race Week)
//     '2024-10-07': { type: 'rest', title: 'Rest Day', description: 'Complete rest day' },
//     '2024-10-08': { 
//       type: 'speed', 
//       title: 'Leg Sharpener', 
//       distance: '5km',
//       description: '3km easy + 4 × 100m strides',
//       details: 'Keep legs active but fresh. Practice race morning warm-up routine.'
//     },
//     '2024-10-09': { type: 'rest', title: 'Rest Day', description: 'Complete rest day' },
//     '2024-10-10': { 
//       type: 'recovery', 
//       title: 'Final Easy Run', 
//       distance: '4km',
//       description: '4km super relaxed easy pace',
//       details: 'Just keep the legs moving.'
//     },
//     '2024-10-11': { 
//       type: 'speed', 
//       title: 'Race Preparation', 
//       distance: '3km',
//       description: '2km easy + 3 × 100m strides',
//       details: 'Practice your pre-race routine timing.'
//     },
//     '2024-10-12': { 
//       type: 'race', 
//       title: '🏁 RACE DAY!', 
//       distance: '21.1km',
//       description: 'Half Marathon - Sub-2 Hour Goal!',
//       details: 'Target pace: 5:41/km average. Start at 5:45-5:50/km for first 4km, settle into 5:38-5:42/km, finish strong!'
//     },
//   };

  // Calendar generation
  const generateCalendar = () => {
    const startDate = new Date(2024, 8, 1); // September 1, 2024
    const endDate = new Date(2024, 9, 12); // October 12, 2024
    const days = [];
    
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
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

  const calendarDays = generateCalendar();
  const months = ['September', 'October'];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <h1 className="text-3xl font-bold mb-2">Half Marathon Training Calendar</h1>
          <p className="text-blue-100">6-Week Sub-2 Hour Plan • Target Race: October 12th</p>
        </div>

        <div className="flex">
          {/* Calendar View */}
          <div className="flex-1 p-6">
            <div className="grid grid-cols-2 gap-8">
              {months.map((month, monthIndex) => (
                <div key={month}>
                  <h2 className="text-xl font-semibold mb-4 text-center">{month} 2024</h2>
                  <div className="grid grid-cols-7 gap-1">
                    {/* Day headers */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                    
                    {/* Calendar days */}
                    {calendarDays
                      .filter(date => date.getMonth() === (monthIndex === 0 ? 8 : 9))
                      .map(date => {
                        // Add empty cells for days before month starts
                        const daysToAdd = [];
                        if (date.getDate() === 1) {
                          for (let i = 0; i < date.getDay(); i++) {
                            daysToAdd.push(
                              <div key={`empty-${i}`} className="p-2"></div>
                            );
                          }
                        }
                        
                        const dateKey = formatDate(date);
                        const workout = trainingData[dateKey];
                        const isSelected = selectedDate === dateKey;
                        const isToday = dateKey === '2024-09-01';
                        
                        return [
                          ...daysToAdd,
                          <div
                            key={dateKey}
                            className={`p-1 cursor-pointer rounded-lg transition-all hover:scale-105 ${
                              isSelected ? 'ring-2 ring-blue-500' : ''
                            } ${isToday ? 'ring-2 ring-green-400' : ''}`}
                            onClick={() => setSelectedDate(dateKey)}
                          >
                            <div className="text-sm font-medium text-center mb-1">
                              {date.getDate()}
                            </div>
                            {workout && (
                              <div className={`text-xs p-1 rounded text-center ${getWorkoutTypeColor(workout.type)}`}>
                                <div className="mb-1">{getWorkoutIcon(workout.type)}</div>
                                <div className="truncate">{workout.title}</div>
                                {workout.distance && (
                                  <div className="text-xs opacity-75">{workout.distance}</div>
                                )}
                              </div>
                            )}
                          </div>
                        ];
                      })}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-3">Workout Types</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-red-100"></span>
                  <span>⚡ Speed Work</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-orange-100"></span>
                  <span>🔥 Tempo Run</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-green-100"></span>
                  <span>🌱 Recovery</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-blue-100"></span>
                  <span>🏔️ Long Run</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-purple-100"></span>
                  <span>? Optional</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-yellow-200"></span>
                  <span>🏁 Race Day</span>
                </div>
              </div>
            </div>
          </div>

          {/* Workout Details Panel */}
          <div className="w-96 bg-gray-100 p-6 border-l">
            {selectedDate ? (
              <div>
                {trainingData[selectedDate] ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold">
                        {new Date(selectedDate).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
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

                    {/* Pacing Guide */}
                    {trainingData[selectedDate].type !== 'rest' && (
                      <div className="bg-white p-4 rounded-lg">
                        <h5 className="font-semibold mb-3 text-gray-700">🎯 Pace Guide:</h5>
                        <div className="space-y-2 text-sm">
                          <div><strong>Easy:</strong> 6:00-6:30/km</div>
                          <div><strong>Marathon:</strong> 5:45-6:00/km</div>
                          <div><strong>Half Marathon:</strong> 5:35-5:41/km</div>
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
                )}
              </div>
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