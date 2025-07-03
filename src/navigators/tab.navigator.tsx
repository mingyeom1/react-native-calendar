import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { HomeScreen } from '../screens/home/home.screen';
import { CalendarScreen } from '../screens/calendar/calendar.screen';
import { LibraryScreen } from '../screens/library/library.screen';
import { MypageScreen } from '../screens/mypage/mypage.screen';

const Tab = createBottomTabNavigator();

export enum TabNavigatorName {
  HOME_TAB = 'HomeTab',
  CALENDAR_TAB = 'HospitalTab',
  LIBRARY_TAB = 'CertificationTab',
  MYPAGE_TAB = 'MypageTab',
}

export const tabScreens = [
  {
    title: 'HOME',
    component: HomeScreen,
    screenName: TabNavigatorName.HOME_TAB,
  },
  {
    title: 'CALENDAR',
    component: CalendarScreen,
    screenName: TabNavigatorName.CALENDAR_TAB,
  },
  {
    title: 'LIBRARY',
    component: LibraryScreen,
    screenName: TabNavigatorName.LIBRARY_TAB,
  },
  {
    title: 'MYPAGE',
    component: MypageScreen,
    screenName: TabNavigatorName.MYPAGE_TAB,
  },
];

const screenOptions = {
  headerShown: false,
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {tabScreens.map((tabScreen, index) => {
        return (
          <Tab.Screen
            key={index}
            name={tabScreen.screenName}
            component={tabScreen.component}
            options={() => {
              return {
                tabBarLabel: tabScreen.title,
              };
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};
