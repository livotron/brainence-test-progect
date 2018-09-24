import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  flexDirection: 'row',
		flexWrap: 'wrap'	
	},
	item: {
		flex: 1,
		width: '50%',
		height: 150,
		padding: 0,
		borderBottomWidth: 0,
		borderBottomColor: '#ccc',
		backgroundColor: 'transparent',
	},
	gallery: {
		flexDirection: 'row',
	 	 flexWrap: 'wrap'
	},
	row: {
		flexDirection: 'row',
		flexWrap:'wrap'
	},
	image: {
		backgroundColor: 'transparent',
		position: 'absolute',
		resizeMode: 'cover',
		height: '100%',
		width: '100%'
	}
  });