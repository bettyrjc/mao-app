import { View, Text, Pressable } from 'react-native';
import React from 'react';
import WalletsCard from '../utils/cards/WalletsCard';
import ButtonResumen from '../utils/buttons/ButtonResumen';
import BudgetCard from '../utils/cards/BudgetCard';
import AddAccountModal from '../utils/modals/AddAccountModal';

type DashboardTemplateProps = {
  onLogout: () => void;
  onNewAccount: (data: any) => void;
  isLoadingAddAccount: boolean;
  dataAccount: any;
};

const DashboardTemplate = ({ onLogout, onNewAccount, isLoadingAddAccount, dataAccount }: DashboardTemplateProps) => {
  const [openAddBank, setOpenAddBank] = React.useState(false);
  const handleOpenAddBank = () => {
    setOpenAddBank(!openAddBank);
  };

  return (
    <View>
      <WalletsCard handleOpenAddBank={handleOpenAddBank} dataAccount={dataAccount} />
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
        isLoading={isLoadingAddAccount}
        defaultValues={{}}
      />
    </View>
  );
};

export default DashboardTemplate;
