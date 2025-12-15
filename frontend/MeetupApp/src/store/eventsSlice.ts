import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '@/types/db/Event';
import {
  getEvents,
  getEventById,
  joinEventApi,
  getJoinRequestsApi,
  setJoinRequestApi,
  getUserEventStatusApi,
} from '@/fetching/events';

interface JoinRequest {
  targetUser: any;
  totalNecessaryApprovals: number;
  currentApprovals: number;
  currentUserApprovalId: number | null;
  currentUserApprovalStatus: string | null;
}

export interface UserEventStatus {
  hasRequestedToJoin: boolean;
  isCreator: boolean;
  isApproved: boolean;
  leftEvent: boolean;
}

interface EventsState {
  currentEvents: Event[];
  pastEvents: Event[];
  displayedCurrentEvent: Event | null;
  displayedPastEvent: Event | null;
  joinRequests: JoinRequest[];
  userEventStatus: UserEventStatus | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  currentEvents: [],
  pastEvents: [],
  displayedCurrentEvent: null,
  displayedPastEvent: null,
  joinRequests: [],
  userEventStatus: null,
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
    { rejectWithValue, dispatch },
  ) => {
    try {
      const data = await joinEventApi(eventId, userId);
      // Refresh user event status after joining
      dispatch(fetchUserEventStatus({ eventId, userId }));
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to join event',
      );
    }
  },
);

export const fetchJoinRequests = createAsyncThunk(
  'events/fetchJoinRequests',
  async (
    { eventId, currentUserId }: { eventId: number; currentUserId: number },
    { rejectWithValue },
  ) => {
    try {
      const data = await getJoinRequestsApi(eventId, currentUserId);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch join requests',
      );
    }
  },
);

export const setJoinRequestStatus = createAsyncThunk(
  'events/setJoinRequestStatus',
  async (
    {
      eventId,
      approverUserId,
      targetUserId,
      status,
    }: {
      eventId: number;
      approverUserId: number;
      targetUserId: number;
      status: 'approved' | 'rejected' | 'pending';
    },
    { rejectWithValue },
  ) => {
    try {
      const data = await setJoinRequestApi(
        eventId,
        approverUserId,
        targetUserId,
        status,
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to set join request status',
      );
    }
  },
);

export const fetchUserEventStatus = createAsyncThunk(
  'events/fetchUserEventStatus',
  async (
    { eventId, userId }: { eventId: number; userId: number },
    { rejectWithValue },
  ) => {
    try {
      const data = await getUserEventStatusApi(eventId, userId);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch user event status',
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

    // Fetch join requests
    builder.addCase(fetchJoinRequests.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchJoinRequests.fulfilled,
      (state, action: PayloadAction<JoinRequest[]>) => {
        state.isLoading = false;
        state.joinRequests = action.payload;
      },
    );
    builder.addCase(fetchJoinRequests.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Set join request status
    builder.addCase(setJoinRequestStatus.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(setJoinRequestStatus.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(setJoinRequestStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch user event status
    builder.addCase(fetchUserEventStatus.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchUserEventStatus.fulfilled,
      (state, action: PayloadAction<UserEventStatus>) => {
        state.isLoading = false;
        state.userEventStatus = action.payload;
      },
    );
    builder.addCase(fetchUserEventStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearDisplayedEvent, clearError } = eventsSlice.actions;
export default eventsSlice.reducer;
