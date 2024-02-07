import {COLORS, COLOR_OPACITY, GRAY_COLORS} from '../constants';

export const findColor = (value: string) => {
  switch (value) {
    case 'in_investigation':
      return COLORS.warning;
    case 'rejected':
    case 'canceled':
      return COLORS.danger;
    case 'approved':
      return COLORS.primaryPurple;
    case 'contract_signature':
      return COLORS.orange;
    case 'active':
    case 'paid':
      return COLORS.success;
    case 'finished':
      return GRAY_COLORS.gray800;
    case 'pending_to_pay':
      return COLORS.primaryPurple;
    case 'waiting_for_signature':
      return COLORS.orange;
    case 'invitation_sent':
      return COLORS.blueGreen;
    case 'filling_forms':
      return COLORS.info;
    case 'pending_payment':
      return COLORS.salmon;
    case 'pending_first_payment':
      return COLORS.salmon;
    default:
      return GRAY_COLORS.gray600;
  }
};
export const backgroundColor = (value: string) => {
  switch (value) {
    case 'in_investigation':
      return COLOR_OPACITY.yellow;
    case 'rejected':
      return COLOR_OPACITY.red;
    case 'approved':
      return COLOR_OPACITY.purple;
    case 'contract_signature':
      return COLOR_OPACITY.orange;
    case 'active':
      return COLOR_OPACITY.green10;
    case 'finished':
      return COLOR_OPACITY.gray;
    case 'invitation_sent':
      return COLOR_OPACITY.blueGreen;
    case 'filling_forms':
      return COLOR_OPACITY.blue;
    case 'pending_payment':
      return COLOR_OPACITY.salmon;
    default:
      return COLOR_OPACITY.gray;
  }
};
export const transformToSelect = (value: string) =>
  Object.entries(value).map(item => ({
    label: item[1],
    value: item[0],
  }));
export const getIcon = (value: string) => {
  switch (value) {
    case 'canceled':
      return 'close-outline';
    case 'paid':
      return 'checkmark-outline';
    case 'pending_to_pay':
      return 'timer-outline';
    case 'waiting_for_signature':
      return 'sync-sharp';
  }
};

export function generateRandomId() {
  var rnd = Math.floor(Math.random() * 1e16);
  return rnd.toString(36).substring(7);
}

export const propertiesStatuses = (value: string) => {
  switch (value) {
    case 'incompleted':
      return COLORS.info;
    case 'rejected':
      return COLORS.danger;
    case 'approved':
      return COLORS.success;
    default:
      return COLORS.primaryPurple;
  }
};
