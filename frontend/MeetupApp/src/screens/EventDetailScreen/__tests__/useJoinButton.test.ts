import { renderHook } from '@testing-library/react-native';
import useJoinButton from '../useJoinButton';

jest.mock('@/store/api', () => ({
  useJoinEventMutation: () => [jest.fn(), { isLoading: false }],
}));

const mockRefetch = jest.fn();

describe('useJoinButton', () => {
  test('should return "Join" button when user has not requested to join', () => {
    const { result } = renderHook(() =>
      useJoinButton({
        userEventStatus: null,
        eventId: 1,
        user: { id: 1, firstName: 'John', lastName: 'Doe', email: '' } as any,
        refetchEvent: mockRefetch,
        refetchStatus: mockRefetch,
      }),
    );

    expect(result.current.buttonConfig.text).toBe('events.join');
    expect(result.current.buttonConfig.disabled).toBe(false);
  });

  test('should return creator button when user is creator', () => {
    const { result } = renderHook(() =>
      useJoinButton({
        userEventStatus: {
          hasRequestedToJoin: false,
          isCreator: true,
          isApproved: false,
          leftEvent: false,
        },
        eventId: 1,
        user: { id: 1, firstName: 'John', lastName: 'Doe', email: '' } as any,
        refetchEvent: mockRefetch,
        refetchStatus: mockRefetch,
      }),
    );

    expect(result.current.buttonConfig.text).toBe('events.youAreCreator');
    expect(result.current.buttonConfig.disabled).toBe(true);
  });

  test('should return "Joined" button when user has requested and been approved', () => {
    const { result } = renderHook(() =>
      useJoinButton({
        userEventStatus: {
          hasRequestedToJoin: true,
          isCreator: false,
          isApproved: true,
          leftEvent: false,
        },
        eventId: 1,
        user: { id: 1, firstName: 'John', lastName: 'Doe', email: '' } as any,
        refetchEvent: mockRefetch,
        refetchStatus: mockRefetch,
      }),
    );

    expect(result.current.buttonConfig.text).toBe('events.joined');
    expect(result.current.buttonConfig.disabled).toBe(true);
  });

  test('should return "Waiting for approval" when user has requested but not yet approved', () => {
    const { result } = renderHook(() =>
      useJoinButton({
        userEventStatus: {
          hasRequestedToJoin: true,
          isCreator: false,
          isApproved: false,
          leftEvent: false,
        },
        eventId: 1,
        user: { id: 1, firstName: 'John', lastName: 'Doe', email: '' } as any,
        refetchEvent: mockRefetch,
        refetchStatus: mockRefetch,
      }),
    );

    expect(result.current.buttonConfig.text).toBe('events.waitingApproval');
    expect(result.current.buttonConfig.disabled).toBe(true);
  });

  test('should provide handleJoin function', () => {
    const { result } = renderHook(() =>
      useJoinButton({
        userEventStatus: null,
        eventId: 1,
        user: { id: 1, firstName: 'John', lastName: 'Doe', email: '' } as any,
        refetchEvent: mockRefetch,
        refetchStatus: mockRefetch,
      }),
    );

    expect(typeof result.current.handleJoin).toBe('function');
  });
});
