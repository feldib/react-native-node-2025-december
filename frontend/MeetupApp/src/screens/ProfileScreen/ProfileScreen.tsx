import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/theme/ThemeContext';
import { useTranslation } from 'react-i18next';

const ProfileScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View style={styles.header}>
        <View
          style={[styles.avatarContainer, { backgroundColor: colors.avatar }]}
        >
          <Text style={[styles.avatarText, { color: colors.textInverse }]}>
            {user.firstName[0]}
            {user.lastName[0]}
          </Text>
        </View>
        <Text style={[styles.name, { color: colors.text }]}>
          {user.firstName} {user.lastName}
        </Text>
      </View>

      <View
        style={[styles.infoSection, { backgroundColor: colors.cardBackground }]}
      >
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            {t('profile.email')}:
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {user.email}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            {t('profile.age')}:
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>{user.age}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            {t('profile.gender')}:
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {user.gender}
          </Text>
        </View>

        {user.description && (
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              {t('profile.about')}:
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {user.description}
            </Text>
          </View>
        )}

        {user.dateJoined && (
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              {t('profile.memberSince')}:
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {new Date(user.dateJoined).toLocaleDateString()}
            </Text>
          </View>
        )}
      </View>

      {user.photos && user.photos.length > 0 && (
        <View style={styles.photosSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('profile.photos')}
          </Text>
          <View style={styles.photosGrid}>
            {user.photos.map((photo, index) => (
              <Image key={index} source={{ uri: photo }} style={styles.photo} />
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.logoutButton,
          { backgroundColor: colors.buttonSecondary },
        ]}
        onPress={handleLogout}
      >
        <Text
          style={[
            styles.logoutButtonText,
            { color: colors.buttonSecondaryText },
          ]}
        >
          {t('profile.logout')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoSection: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  infoRow: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  photosSection: {
    marginBottom: 20,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  logoutButton: {
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
