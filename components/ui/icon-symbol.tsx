import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;
//here we enter the icon name from the symbol and the icon name from the material icons 
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'message.fill': 'chat',
  'list.bullet': 'list',
  'cart.fill': 'shopping-cart',
  'bell.fill': 'notifications',
  'calendar.fill': 'event-note',
  'star.fill': 'star',
  'person.fill': 'person',
  'magnifyingglass': 'search',
  'slider.horizontal.3': 'tune',
  'checkmark.shield.fill': 'verified-user',
  'hands.sparkles.fill': 'clean-hands',
  'certificate.fill': 'workspace-premium',
  'arrow.left': 'arrow-back',
  'gift.fill': 'redeem',
  'credit-card': 'credit-card',
  'account-balance': 'account-balance',
  'google': { set: 'MaterialCommunityIcons', name: 'google' },
  'google-pay': { set: 'MaterialCommunityIcons', name: 'google' },
  'account-balance-wallet': 'account-balance-wallet',
  'more-horiz': 'more-horiz',
  'plus': 'add',
  'amazon': { set: 'MaterialCommunityIcons', name: 'amazon' },
  'content-cut': 'content-cut',
  'handyman': 'handyman',
  'ac-unit': 'ac-unit',
  'bathtub': 'bathtub',
  'kitchen': 'kitchen',
  'chair': 'chair',
  'spa': 'spa',
  'face': 'face',
  'brush': 'brush',
  'power': 'power',
  'plumbing': 'plumbing',
  'local-fire-department': 'local-fire-department',
} as any;

//here we are using the material icons 
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const mapping = MAPPING[name];

  if (mapping && typeof mapping === 'object') {
    if (mapping.set === 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons color={color} size={size} name={mapping.name} style={style} />;
    }
  }

  return <MaterialIcons color={color} size={size} name={typeof mapping === 'string' ? mapping : mapping?.name} style={style} />;
}
