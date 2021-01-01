import React from "react";
import { View, Text, StyleSheet, Image, FlatList,Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import { firebaseAuth } from './environment/config';


const WIDTH = Dimensions.get('window').width
export default class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = { currentUser: null, errorMessage: null,mylist:{} }
  }
  componentDidMount() {
    const myevents = firebase.database().ref("foodies");
    myevents.on("value",datasnap=>{
    //    console.log(datasnap.val())
       this.setState({ mylist: datasnap.val() })
    })
  
  }

  renderdata = () => {
    var dict = this.state.mylist;
    var arr = [];
  for (var key in dict) {
   arr.push(dict[key]);
  }
  console.log(arr);
  
  return arr;
  }


    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row" }}>
                    <Image source={{ uri:post.personimage}} style={styles.avatar} />
                        
                        <View>
                            <Text style={styles.name}>{post.name}</Text>
                            <Text style={styles.timestamp}>by {post.name}</Text>
                        </View>

                    </View>
                    
                    <Image source={{ uri:post.post }} style={styles.postImage} resizeMode="cover" />
                    
                    <View style={{ flexDirection: "row" ,marginTop:0,marginBottom:8,borderRadius: 10,}}>
                        <Icon name="heart-o" size={25}  style={{ marginRight: WIDTH/5 }} />
                        <Icon name="comment-o" size={25} style={{ marginRight: WIDTH/5 }}  />
                        <Icon name="send-o" size={25} style={{ marginRight: WIDTH/5 }}  />
                        <Icon name="bookmark-o" size={25} style={{ marginRight: WIDTH/5 }}  />

                    </View>
                    <View style={{ flexDirection: "row" ,marginBottom:5,borderRadius: 10,}}>
                        <Text style={{ fontsize:20,marginRight: WIDTH/7}}>Like</Text>
                        <Text style={{ fontsize:20,}}>Comments</Text>
                    </View>

                    <Text style={{ fontWeight: 'bold',fontSize:15}}>{post.owner}</Text>
                    <Text style={styles.post}>{post.Caption}</Text>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                <Image source={require("./assets/Logo1.png")} style={styles.logo} />
                    <Text style={styles.headerTitle}>munchIn</Text>
                    <Icon name="wechat" size={30} style={{ marginLeft: WIDTH/2.3 }}  />

                </View>

                <FlatList
                    style={styles.feed}
                    data={this.renderdata()}
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                ></FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFCC"
    },
    header: {
        paddingTop: 20,
        paddingBottom: 16,
        flexDirection:'row',
        backgroundColor: "#FFF",
      
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500",
        fontWeight:"bold",
        color:"#FFD700",
        marginLeft:5
    },
    feed: {
        marginHorizontal: 8

    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 5,
        flexDirection: "row",
        marginVertical: 3
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16,
    },
    logo: {
      width: 36,
      height: 36,
      borderRadius: 18,
      marginRight: 16,
      marginLeft:15
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65"
    },
    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4
    },
    post: {
        marginTop: 10,
        fontSize: 14,
        color: "#838899"
    },
    postImage: {
        width: '100%',
        height: 180,
        borderRadius: 5,
        marginVertical: 16
    }
});