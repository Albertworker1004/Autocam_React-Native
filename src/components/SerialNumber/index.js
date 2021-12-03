import React, {useState} from 'react';
import {View, Text} from 'react-native';

import {Input, CheckBox, Icon} from 'react-native-elements';

import colors from '~/styles';
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SerialNumber = ({openPopup}) => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: '2%',
        }}>
        <Text style={styles.title}>Serial Number</Text>
        <View style={styles.showSerial}>
          <TouchableOpacity onPress={openPopup}>
            <Text style={{color: colors.lightGrey, textAlign: 'center'}}>
              9700283
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.list}>
          <Text style={styles.title}>Log Fault:</Text>
        </View>
        <Input
          inputContainerStyle={styles.input}
          inputStyle={{
            fontSize: 18,
            color: colors.opacityWhite,
            textAlignVertical: 'top',
          }}
          placeholder="What's wrong?"
          multiline={true}
          numberOfLines={8}
        />
      </View>
      <View style={styles.card}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '2%',
          }}>
          <Text style={styles.title}>Log Vehicle</Text>
          <View style={{width: '70%'}}>
            <Input
              placeholder="Vehicle ID"
              inputContainerStyle={{
                width: '100%',
                borderBottomWidth: 1,
                borderWidth: 1,
                borderColor: '#C0C0C0',
              }}
              inputStyle={{
                paddingVertical: 0,
                paddingRight: '5%',
                margin: 0,
                fontSize: 18,
                color: colors.opacityWhite,
                textAlign: 'right',
              }}
            />
          </View>
        </View>
        <View style={{padding: 0}}>
          <CheckBox
            type="material"
            title="Under Warranty"
            checkedIcon={<Icon name="radio-button-checked" color={'#959595'} />}
            uncheckedIcon={
              <Icon name="radio-button-unchecked" color={'#959595'} />
            }
            checked={!checked}
            onPress={() => setChecked(!checked)}
            containerStyle={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              padding: 0,
              margin: 0,
            }}
            textStyle={{
              fontSize: 13,
              color: '#959595',
            }}
          />
          <CheckBox
            type="material"
            title="Not Under Warranty"
            checkedIcon={<Icon name="radio-button-checked" color={'#959595'} />}
            uncheckedIcon={
              <Icon name="radio-button-unchecked" color={'#959595'} />
            }
            checked={checked}
            onPress={() => setChecked(!checked)}
            containerStyle={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              padding: 0,
              margin: 0,
            }}
            textStyle={{
              fontSize: 13,
              color: '#959595',
            }}
          />
        </View>
      </View>
    </>
  );
};

export default SerialNumber;
