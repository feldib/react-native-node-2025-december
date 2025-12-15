import type { RootParamList as AppRootParamList } from '@/components/navigation/AppNavigator/AppNavigator';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParamList {}
  }
}
