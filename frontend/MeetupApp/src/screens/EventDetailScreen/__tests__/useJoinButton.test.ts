import { renderHook } from '@testing-library/react-native';
import useJoinButton from '../useJoinButton';
import { AppDispatch } from '@/store/store';

const mockDispatch: AppDispatch = jest.fn();

describe('useJoinButton', () => {
  test('should return "Join" button when user has not requested to join', () => {
    const { result } = renderHook(() =>
      useJoinButton({
        userEventStatus: null,
        eventId: 1,
        user: { id: 1, firstName: 'John', lastName: 'Doe', email: '' } as any,
        dispatch: mockDispatch,
      }),
    );

    expect(result.current.buttonConfig.text).toBe('Join');
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
        dispatch: mockDispatch,
      }),
    );

    expect(result.current.buttonConfig.text).toBe("You're the creator");
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
        dispatch: mockDispatch,
      }),
    );

    expect(result.current.buttonConfig.text).toBe('Joined');
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
        dispatch: mockDispatch,
      }),
    );

    expect(result.current.buttonConfig.text).toBe('Waiting for approval');
    expect(result.current.buttonConfig.disabled).toBe(true);
  });

  test('should provide handleJoin function', () => {
    const { result } = renderHook(() =>
      useJoinButton({
        userEventStatus: null,
        eventId: 1,
        user: { id: 1, firstName: 'John', lastName: 'Doe', email: '' } as any,
        dispatch: mockDispatch,
      }),
    );

    expect(typeof result.current.handleJoin).toBe('function');
  });
});
