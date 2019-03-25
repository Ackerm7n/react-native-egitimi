import React, {Component} from 'react';
import {StyleSheet, Image, View, Button, Text,ActivityIndicator} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
	title: 'Select Avatar',
	customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
	storageOptions: {
		skipBackup: true,
		path: 'images',
	},
	allowsEditing: true
};

export default class App extends Component<Props> {

	state = {
		avatarSource: null,
	};

	onSelectPicture = () => {
		ImagePicker.showImagePicker(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				const source = { uri: response.uri };

				this.setState({
					avatarSource: source,
				});

				this.uploadPhoto(response)
			}
		});
	};

	uploadPhoto = async response => {
		const data = new FormData();
		data.append('name', 'avatar');
		data.append('fileData', {
			uri : response.uri,
			type: response.type,
			name: response.fileName
		});
		const config = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: data,
		};
		fetch("http://localhost:3001/" + "upload", config)
			.then((checkStatusAndGetJSONResponse)=>{
				console.log(checkStatusAndGetJSONResponse);
			}).catch((err)=>{console.log(err)});
	};

	render() {
		return (
			<View style={styles.container}>
				<Image source={this.state.avatarSource} style={{ width: 200, height: 200 }} />
				<Button
					title={"Select Picture"}
					onPress={this.onSelectPicture}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
