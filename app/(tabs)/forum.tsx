import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import Modal from 'react-native-modal';
import { Modal } from 'react-native';

import { KeyboardAvoidingView, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export default function Forum() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
const [questionText, setQuestionText] = useState('');
// Optionnel : pour gérer plusieurs fichiers (jusqu'à 4 comme dans ton design)
const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
const [selectedImages, setSelectedImages] = useState<string[]>([]); // chemins ou URIs des images

  const posts = [
    {
      id: '1',
      author: 'Amira ben aissia',
      date: '14/12/2025 à 19:02',
      views: 27,
      content: 'libnet bilehi chkon yaraf marka behya mta3 batteur ??',
      likes: 1,
      comments: 1,
      replies: [
        {
          id: 'r1',
          author: 'jihen',
          date: '10/01/2026 à 11:59',
          content:
            'russel hubbs fi l ghali sinn les marques lokhrin kima lexical lel moyenne gamme',
          likes: 1,
        },
      ],
    },
  ];

  const openModal = (postId: string) => {
    setSelectedPostId(postId);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setNewComment('');
  };

  // Exemple de fonction pour ajouter une image (à connecter plus tard à expo-image-picker)
const addImage = (uri: string) => {
  if (selectedImages.length < 4) {
    setSelectedImages([...selectedImages, uri]);
  } else {
    alert('Maximum 4 images autorisées');
  }
};

// Exemple de fonction d'envoi (à connecter à ton backend)
const handleSendQuestion = () => {
  if (!questionText.trim()) return;

  console.log('Question envoyée :', {
    text: questionText,
    images: selectedImages,
  });

  // Reset + fermeture
  setQuestionText('');
  setSelectedImages([]);
  setQuestionModalVisible(false);
  alert('Question envoyée ! (simulation)');
};
  const selectedPost = posts.find((p) => p.id === selectedPostId);

  const renderReply = ({ item }: { item: (typeof posts)[0]['replies'][0] }) => (
    <View style={styles.replyCard}>
      <View style={styles.replyHeader}>
        <View style={styles.replyAuthorAvatar}>
          <Text style={styles.replyAuthorInitial}>
            {item.author.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View>
          <Text style={styles.replyAuthorName}>{item.author}</Text>
          <Text style={styles.replyMeta}>Répondu le {item.date}</Text>
        </View>
      </View>

      <View style={styles.replyTag}>
        <Text style={styles.replyTagText}>Réponse</Text>
      </View>

      <Text style={styles.replyContent}>{item.content}</Text>

      <View style={styles.replyActions}>
        <TouchableOpacity style={styles.replyActionItem}>
          <MaterialCommunityIcons name="thumb-up-outline" size={18} color="#666" />
          <Text style={styles.replyActionCount}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.replyActionItem}>
          <Text style={styles.seeReplies}>Voir {item.likes} réponse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
      <>

    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Carte invitation forum */}
      <View style={styles.invitationCard}>
        <View style={styles.iconBubble}>
          <MaterialCommunityIcons name="chat-processing" size={48} color="#fff" />
        </View>

        <Text style={styles.invitationTitle}>Forum de la Mariée</Text>

        <Text style={styles.invitationSubtitle}>
          Partagez vos expériences, posez vos questions et bénéficiez de l'expertise de
          notre communauté
        </Text>
      </View>

      {/* Message personnalisé + bouton poser question */}
      <View style={styles.askQuestionContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=68' }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.askTextContainer}>
          <Text style={styles.askText}>Avez-vous des questions, Nour ?</Text>

         <TouchableOpacity
  style={styles.postButton}
  activeOpacity={0.85}
  onPress={() => setQuestionModalVisible(true)}  // ← ajoute ceci
>
  <Text style={styles.postButtonText}>+ Poser une question</Text>
</TouchableOpacity>
        </View>
      </View>

      {/* Posts */}
      {posts.map((post) => (
        <View key={post.id} style={styles.postCard}>
          {/* En-tête du post */}
          <View style={styles.postHeader}>
            <View style={styles.authorInfo}>
              <View style={styles.authorAvatar}>
                <Text style={styles.authorInitial}>
                  {post.author.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View>
                <Text style={styles.authorName}>{post.author}</Text>
                <Text style={styles.postMeta}>
                  Publié le {post.date} • {post.views} vues
                </Text>
              </View>
            </View>

            <MaterialCommunityIcons name="dots-horizontal" size={20} color="#666" />
          </View>

          {/* Type de post */}
          <View style={styles.questionTag}>
            <Text style={styles.questionTagText}>Question</Text>
          </View>

          {/* Contenu */}
          <Text style={styles.postContent}>{post.content}</Text>

          {/* Actions */}
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionItem}>
              <MaterialCommunityIcons name="thumb-up-outline" size={20} color="#666" />
              <Text style={styles.actionCount}>{post.likes}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => openModal(post.id)}
            >
              <MaterialCommunityIcons name="comment-outline" size={20} color="#666" />
              <Text style={styles.actionCount}>{post.comments}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
              <MaterialCommunityIcons name="share-outline" size={20} color="#666" />
              <Text style={styles.actionCount}>Partager</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.replyButton}
              onPress={() => openModal(post.id)}
            >
              <Text style={styles.replyButtonText}>Répondre</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Modal des réponses */}

    </ScrollView>
<Modal
  visible={modalVisible}
  animationType="slide"
  transparent
  onRequestClose={closeModal}
>
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        {/* HEADER */}
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Réponses</Text>
          <TouchableOpacity onPress={closeModal}>
            <MaterialCommunityIcons name="close" size={24} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={selectedPost?.replies || []}
          renderItem={renderReply}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 80 }}
        />

        {/* INPUT */}
        <View style={styles.replyInputContainer}>
          <TextInput
            style={styles.replyInput}
            placeholder="Répondre..."
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />
          <TouchableOpacity>
            <MaterialCommunityIcons name="send" size={24} color="#D367BB" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </KeyboardAvoidingView>
</Modal>

{/* ────────────────────────────────────────────────
    MODAL "POSER UNE QUESTION" — centrée au milieu
──────────────────────────────────────────────── */}
<Modal
  visible={questionModalVisible}
  animationType="fade"
  transparent={true}
  onRequestClose={() => setQuestionModalVisible(false)}
>
  <View style={styles.questionModalOverlay}>
    <View style={styles.questionModalContent}>
      {/* Header */}
      <View style={styles.questionModalHeader}>
        <Text style={styles.questionModalTitle}>Poser une question</Text>
        <TouchableOpacity
          onPress={() => setQuestionModalVisible(false)}
          style={styles.closeButton}
        >
          <MaterialCommunityIcons name="close-circle" size={34} color="#D367BB" />
        </TouchableOpacity>
      </View>
      <ScrollView
  style={{ flex: 1 }}                          // ← important
  contentContainerStyle={{ flexGrow: 1 }}      // ← force le contenu à grandir
  keyboardShouldPersistTaps="handled"
  showsVerticalScrollIndicator={false}
>
  {/* Champ question */}
  <Text style={styles.questionLabel}>Votre question :</Text>
  <TextInput
    style={styles.questionInput}
    placeholder="Décrivez votre question en détail..."
    placeholderTextColor="#aaa"
    value={questionText}
    onChangeText={setQuestionText}
    multiline
    numberOfLines={6}
    textAlignVertical="top"
  />

  {/* Section images */}
  <Text style={styles.imagesLabel}>Images (optionnel — max. 4) :</Text>

  <View style={styles.filePickersGrid}>
    {Array.from({ length: 4 }).map((_, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.filePickerSlot,
          selectedImages[index] && styles.filePickerSlotSelected,
        ]}
        activeOpacity={0.85}
        onPress={() => {
          alert(`Sélection image ${index + 1} (à implémenter)`);
        }}
      >
        {selectedImages[index] ? (
          <Image
            source={{ uri: selectedImages[index] }}
            style={styles.previewImage}
          />
        ) : (
          <>
            <MaterialCommunityIcons
              name="image-plus"
              size={28}
              color="#D367BB"
            />
            <Text style={styles.filePickerLabel}>Ajouter</Text>
          </>
        )}
      </TouchableOpacity>
    ))}
  </View>
</ScrollView>
      {/* Boutons */}
      <View style={styles.modalFooter}>
        <TouchableOpacity
          style={[styles.modalButton, styles.cancelButton]}
          onPress={() => setQuestionModalVisible(false)}
        >
          <Text style={styles.cancelButtonText}>Annuler</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.modalButton,
            styles.submitButton,
            !questionText.trim() && styles.submitButtonDisabled,
          ]}
          onPress={handleSendQuestion}
          disabled={!questionText.trim()}
        >
          <Text style={styles.submitButtonText}>Envoyer la question</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
 </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },

  invitationCard: {
    backgroundColor: '#F0E0EE',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconBubble: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D367BB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  invitationTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#D367BB',
    marginBottom: 8,
  },
  invitationSubtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },

  askQuestionContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  askTextContainer: {
    flex: 1,
  },
  askText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  postButton: {
    backgroundColor: '#D367BB',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  postButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },

  postCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D367BB',
    shadowColor: '#D367BB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D367BB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  authorInitial: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  authorName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  postMeta: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },

  questionTag: {
    backgroundColor: '#F0E0EE',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  questionTagText: {
    color: '#D367BB',
    fontSize: 13,
    fontWeight: '600',
  },

  postContent: {
    fontSize: 15,
    color: '#222',
    lineHeight: 22,
    marginBottom: 16,
  },

  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionCount: {
    marginLeft: 6,
    color: '#3A68F1',
    fontSize: 13,
  },
  replyButton: {
    backgroundColor: '#D367BB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  replyButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },

  // ────────────────────────────────────────────────
  // MODAL STYLES
  // ────────────────────────────────────────────────
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  likesTotal: {
    fontSize: 16,
    color: '#D367BB',
    marginBottom: 16,
    textAlign: 'center',
  },
 repliesList: {
  flex: 1,                    // ← change de flexGrow: 0 à flex: 1
  marginBottom: 16,           // espace avant l'input
},
  replyCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0E0EE',
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  replyAuthorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D367BB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  replyAuthorInitial: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  replyAuthorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  replyMeta: {
    fontSize: 12,
    color: '#777',
  },
  replyTag: {
    backgroundColor: '#F0E0EE',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 8,
  },
  replyTagText: {
    color: '#D367BB',
    fontSize: 12,
    fontWeight: '600',
  },
  replyContent: {
    fontSize: 14,
    color: '#222',
    marginBottom: 12,
  },
  replyActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  replyActionCount: {
    marginLeft: 4,
    color: '#666',
    fontSize: 12,
  },
  seeReplies: {
    color: '#666',
    fontSize: 12,
  },
// Ajoute ceci si l'input semble encore trop bas
replyInputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
  borderRadius: 24,
  padding: 8,
  marginTop: 8,               // réduit l'espace au-dessus
  marginBottom: 8,            // marge en bas de l'écran
},
  replyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  replyInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  sendButton: {
    marginLeft: 8,
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'flex-end',
},

modalContent: {
  backgroundColor: '#fff',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 16,
  height: '85%',
},

//----------------
questionModalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.60)',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
},

questionModalContent: {
  backgroundColor: '#ffffff',
  borderRadius: 28,
  width: '90%',
  // PAS de maxHeight
  minHeight: 500,           // ← minimum pour être sûr que tout rentre
  maxHeight: '90%',         // ← limite haute mais pas trop stricte
  padding: 24,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: 0.40,
  shadowRadius: 24,
  elevation: 16,
},
questionModalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 28,
  paddingBottom: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#f0e0ee',
},

questionModalTitle: {
  fontSize: 22,
  fontWeight: '700',
  color: '#D367BB',
  letterSpacing: 0.4,
},

closeButton: {
  padding: 4,
},

questionLabel: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
  marginBottom: 10,
},

questionInput: {
  backgroundColor: '#fdf9fc',
  borderRadius: 16,
  borderWidth: 1.5,
  borderColor: '#E8D5E5',
  padding: 16,
  fontSize: 16,
  color: '#222',
  minHeight: 160,
  textAlignVertical: 'top',
  marginBottom: 28,
  shadowColor: '#D367BB',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.12,
  shadowRadius: 6,
  elevation: 3,
},

imagesLabel: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
  marginBottom: 14,
},

filePickersGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginBottom: 24,
},

filePickerSlot: {
  width: (width - 80) / 2, // 2 par ligne sur mobile
  height: 110,
  backgroundColor: '#f9f0f7',
  borderRadius: 16,
  borderWidth: 2,
  borderColor: '#E8D5E5',
  borderStyle: 'dashed',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 12,
},

filePickerSlotSelected: {
  borderStyle: 'solid',
  borderColor: '#D367BB',
  backgroundColor: '#fff',
},

previewImage: {
  width: '100%',
  height: '100%',
  borderRadius: 14,
},

filePickerLabel: {
  fontSize: 13,
  color: '#D367BB',
  marginTop: 8,
  fontWeight: '500',
},

modalFooter: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 16,
  marginTop: 20,
},

modalButton: {
  flex: 1,
  paddingVertical: 16,
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 6,
  elevation: 3,
},

cancelButton: {
  backgroundColor: '#f8f8f8',
  borderWidth: 1,
  borderColor: '#ddd',
},

cancelButtonText: {
  color: '#555',
  fontWeight: '600',
  fontSize: 16,
},

submitButton: {
  backgroundColor: '#D367BB',
},

submitButtonDisabled: {
  backgroundColor: '#e0c0d5',
},

submitButtonText: {
  color: '#fff',
  fontWeight: '700',
  fontSize: 16,
},

});