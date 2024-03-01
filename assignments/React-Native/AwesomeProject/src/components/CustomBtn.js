import { Button, Alert, View } from 'react-native'

export default function CustomBtn() {
    return <View>
        <Button
            title="Press me"
            color="#f194ff"
            onPress={() => Alert.alert('Button with adjusted color pressed')}
        />
    </View>
}