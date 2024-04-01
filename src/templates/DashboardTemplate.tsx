import { View, Text, Pressable } from 'react-native';
import React from 'react';
import WalletsCard from '../utils/cards/WalletsCard';
import ButtonResumen from '../utils/buttons/ButtonResumen';
import BudgetCard from '../utils/cards/BudgetCard';
import AddAccountModal from '../utils/modals/AddAccountModal';

type DashboardTemplateProps = {
  onLogout: () => void;
  onNewAccount: (data: any) => void;
};

const DashboardTemplate = ({ onLogout, onNewAccount }: DashboardTemplateProps) => {
  const [openAddBank, setOpenAddBank] = React.useState(false);
  const handleOpenAddBank = () => {
    setOpenAddBank(!openAddBank);
  };

  return (
    <View>
      <WalletsCard handleOpenAddBank={handleOpenAddBank} />
      <ButtonResumen />
      <BudgetCard />
      <Pressable onPress={onLogout}>
        <Text>Logout</Text>
      </Pressable>

      <AddAccountModal
        openAddBank={openAddBank}
        handleModalOpenAddBank={handleOpenAddBank}
        onSubmitData={onNewAccount}
        names={'names'}
        isLoading={false}
        defaultValues={{}}
      />
    </View>
  );
};

export default DashboardTemplate;
