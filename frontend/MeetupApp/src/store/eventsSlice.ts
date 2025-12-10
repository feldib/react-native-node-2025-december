import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../types/Event';
import { getEvents, getEventById, joinEventApi } from '../fetching/events';

interface EventsState {
  currentEvents: Event[];
  pastEvents: Event[];
  displayedCurrentEvent: Event | null;
  displayedPastEvent: Event | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  currentEvents: [],
  pastEvents: [],
  displayedCurrentEvent: null,
  displayedPastEvent: null,
  isLoading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getEvents();
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch events',
      );
    }
  },
);

export const fetchEventById = createAsyncThunk(
  'events/fetchById',
  async (eventId: number, { rejectWithValue }) => {
    try {
      const data = await getEventById(eventId);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch event',
      );
    }
  },
);

export const joinEvent = createAsyncThunk(
  'events/join',
  async (
    { eventId, userId }: { eventId: number; userId: number },
    { rejectWithValue },
  ) => {
    try {
      const data = await joinEventApi(eventId, userId);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to join event',
      );
    }
  },
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearDisplayedEvent: state => {
      state.displayedCurrentEvent = null;
      state.displayedPastEvent = null;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Fetch all events
    builder.addCase(fetchEvents.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchEvents.fulfilled,
      (state, action: PayloadAction<Event[]>) => {
        state.isLoading = false;
        // Split events into current and past
        state.currentEvents = action.payload.filter(
          (event: Event) => event.finishDate === null,
        );
        state.pastEvents = action.payload.filter(
          (event: Event) => event.finishDate !== null,
        );
      },
    );
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch event by ID
    builder.addCase(fetchEventById.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchEventById.fulfilled,
      (state, action: PayloadAction<Event>) => {
        state.isLoading = false;
        // Set appropriate displayed event based on finishDate
        if (action.payload.finishDate === null) {
          state.displayedCurrentEvent = action.payload;
          const index = state.currentEvents.findIndex(
            (e: Event) => e.id === action.payload.id,
          );
          if (index !== -1) {
            state.currentEvents[index] = action.payload;
          }
        } else {
          state.displayedPastEvent = action.payload;
          const index = state.pastEvents.findIndex(
            (e: Event) => e.id === action.payload.id,
          );
          if (index !== -1) {
            state.pastEvents[index] = action.payload;
          }
        }
      },
    );
    builder.addCase(fetchEventById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Join event
    builder.addCase(joinEvent.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      joinEvent.fulfilled,
      (state, action: PayloadAction<Event>) => {
        state.isLoading = false;
        // Set appropriate displayed event based on finishDate
        if (action.payload.finishDate === null) {
          state.displayedCurrentEvent = action.payload;
          const index = state.currentEvents.findIndex(
            (e: Event) => e.id === action.payload.id,
          );
          if (index !== -1) {
            state.currentEvents[index] = action.payload;
          }
        } else {
          state.displayedPastEvent = action.payload;
          const index = state.pastEvents.findIndex(
            (e: Event) => e.id === action.payload.id,
          );
          if (index !== -1) {
            state.pastEvents[index] = action.payload;
          }
        }
      },
    );
    builder.addCase(joinEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearDisplayedEvent, clearError } = eventsSlice.actions;
export default eventsSlice.reducer;
