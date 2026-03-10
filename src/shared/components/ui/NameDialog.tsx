import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { Span, styled, Text, YStack } from "tamagui";
import {
  Colors,
  FontFamily,
  Radius,
  Shadow,
  Spacing,
} from "@shared/constants/design";

// ─── Styled ───────────────────────────────────────────────────────────────────

const DialogTitle = styled(Text, {
  fontSize: 22,
  color: Colors.textPrimary,
  marginBottom: Spacing.sm,
} as any);

const DialogSubtitle = styled(Text, {
  fontSize: 16,
  color: Colors.textSecondary,
  marginBottom: Spacing["2xl"],
  lineHeight: 20,
} as any);

const SaveButtonText = styled(Text, {
  color: Colors.accentForeground,
  fontSize: 16,
} as any);

// ─── Component ────────────────────────────────────────────────────────────────

interface NameDialogProps {
  onSave: (name: string) => void;
}

export const NameDialog = ({ onSave }: NameDialogProps) => {
  const [name, setName] = useState("");

  const handleSave = () => {
    const trimmed = name.trim();
    if (trimmed.length > 0) {
      onSave(trimmed);
    }
  };

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <BlurView
        intensity={90}
        tint="dark"
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />

      <View style={styles.card}>
        <YStack alignItems="flex-end">
          <DialogTitle style={{ fontFamily: FontFamily.archivoBold }}>
            Welcome to
          </DialogTitle>
          <DialogTitle marginTop={-Spacing.md}>
            <Span style={{ fontFamily: FontFamily.michroma }}>Pace5K</Span> 👋
          </DialogTitle>
        </YStack>

        <DialogSubtitle style={{ fontFamily: FontFamily.archivo }}>
          What should we call you?
        </DialogSubtitle>

        <TextInput
          style={styles.input}
          placeholder="Your first name"
          placeholderTextColor={Colors.textTertiary}
          value={name}
          onChangeText={setName}
          autoFocus
          returnKeyType="done"
          onSubmitEditing={handleSave}
          maxLength={40}
        />

        <Pressable
          style={({ pressed }) => [
            styles.saveBtn,
            {
              backgroundColor:
                name.trim().length > 0 ? Colors.accent : Colors.border,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
          onPress={handleSave}
          disabled={name.trim().length === 0}
        >
          <SaveButtonText
            style={
              {
                fontFamily: FontFamily.archivoBold,
                color:
                  name.trim().length > 0
                    ? Colors.accentForeground
                    : Colors.textTertiary,
              } as any
            }
          >
            Let's Go!
          </SaveButtonText>
        </Pressable>
      </View>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    paddingHorizontal: Spacing["2xl"],
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius["2xl"],
    padding: Spacing["2xl"],
    width: "100%",
    ...Shadow.lg,
  },
  input: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md + 2,
    fontSize: 16,
    fontFamily: FontFamily.archivo,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.surfaceSecondary,
  },
  saveBtn: {
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md + 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
