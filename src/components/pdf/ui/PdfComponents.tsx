import { Text, View, StyleSheet, Svg, Path } from "@react-pdf/renderer";
import { getIconPath } from "./PdfIcons";

// src/components/pdf/ui/PdfComponents.tsx

export const renderMarkdown = (text: string) => {
  if (!text) return null;

  // Reguliarus reiškinys ieško teksto tarp ** (pvz., **paryškintas**)
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Pašaliname žvaigždutes ir grąžiname paryškintą tekstą
      const content = part.substring(2, part.length - 2);
      return (
        <Text key={index} style={{ fontFamily: 'RobotoBold' }}>
          {content}
        </Text>
      );
    }
    // Grąžiname paprastą tekstą
    return <Text key={index}>{part}</Text>;
  });
};

// Bendri stiliai
const uiStyles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  listIconBox: {
    width: 20,
    marginTop: 2,
    marginRight: 6,
    alignItems: 'center',
  },
  listTextContainer: {
    flex: 1,
  },
  listTitle: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: 10,
    color: '#1e293b',
    marginBottom: 2,
  },
  listDesc: {
    fontFamily: 'Roboto',
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.4,
  },
  iconHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 8,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay', // Gražesnė antraštė
    fontWeight: 700,
    fontSize: 16,
    color: '#1e293b',
    textTransform: 'uppercase',
    marginLeft: 12,
  },
  heroSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 12,
    border: '1px solid #e2e8f0'
  },
  archetypeTitle: {
    fontFamily: 'PlayfairDisplay',
    fontWeight: 700,
    fontSize: 22,
    color: '#7c3aed',
    marginBottom: 5,
  },
  keywordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  keywordBadge: {
    backgroundColor: '#ede9fe',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 4,
    fontSize: 8,
    color: '#5b21b6',
    fontFamily: 'Roboto',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  coreDescBox: {
    marginTop: 10,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fffbeb',
    borderLeftWidth: 4,
    borderLeftColor: '#fbbf24',
    borderRadius: 4,
  },
  twoColumnLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  columnHalf: {
    width: '48%',
  },
  columnTitle: {
    fontFamily: 'PlayfairDisplay',
    fontWeight: 700,
    fontSize: 12,
    marginBottom: 10,
    color: '#1e293b',
    textTransform: 'uppercase',
    borderBottom: '1px dashed #cbd5e1',
    paddingBottom: 4
  },
  paragraph: {
     fontFamily: 'Roboto',
     fontSize: 10,
     lineHeight: 1.6,
     color: '#334155',
     textAlign: 'justify'
  }
});

// --- HELPER ---
const PdfIcon = ({ name, color, size = 20 }: { name: string, color: string, size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d={getIconPath(name)} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// --- KOMPONENTAI ---

export const StrengthItem = ({ title, desc }: { title: string, desc: string }) => (
  <View style={uiStyles.listItem} wrap={false}>
    <View style={uiStyles.listIconBox}>
       <PdfIcon name="check" color="#16a34a" size={14} />
    </View>
    <View style={uiStyles.listTextContainer}>
      <Text style={uiStyles.listTitle}>{title}</Text>
      <Text style={uiStyles.listDesc}>{renderMarkdown(desc)}</Text>
    </View>
  </View>
);

export const ChallengeItem = ({ title, desc }: { title: string, desc: string }) => (
  <View style={uiStyles.listItem} wrap={false}>
    <View style={uiStyles.listIconBox}>
        <PdfIcon name="cross" color="#dc2626" size={14} />
    </View>
    <View style={uiStyles.listTextContainer}>
      <Text style={uiStyles.listTitle}>{title}</Text>
      <Text style={uiStyles.listDesc}>{renderMarkdown(desc)}</Text>
    </View>
  </View>
);

export const IconHeader = ({ title, iconName }: { title: string, iconName: string }) => (
  <View style={uiStyles.iconHeader} wrap={false}>
    <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#f3e8ff', alignItems: 'center', justifyContent: 'center' }}>
       <PdfIcon name={iconName} color="#7c3aed" size={18} />
    </View>
    <Text style={uiStyles.headerTitle}>{title}</Text>
  </View>
);

export const HeroSection = ({ archetype, keywords, zodiacSignEng }: { archetype: string, keywords: string[], zodiacSignEng: string }) => (
  <View style={uiStyles.heroSection} wrap={false}>
    <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#fef3c7', alignItems: 'center', justifyContent: 'center', marginRight: 15, border: '1px solid #fbbf24' }}>
       <PdfIcon name={zodiacSignEng} color="#d97706" size={32} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 8, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>Tavo Kosminis Archetipas</Text>
      <Text style={uiStyles.archetypeTitle}>{archetype}</Text>
      <View style={uiStyles.keywordsRow}>
        {keywords.map((kw, i) => (
          <Text key={i} style={uiStyles.keywordBadge}>{kw}</Text>
        ))}
      </View>
    </View>
  </View>
);

export const CoreDescriptionBox = ({ description }: { description: string }) => (
  <View style={uiStyles.coreDescBox} wrap={false}>
     <Text style={{ fontFamily: 'RobotoBold', marginBottom: 5, color: '#b45309', fontSize: 10 }}>
        ESMĖ
     </Text>
     <Text style={uiStyles.paragraph}>
        {renderMarkdown(description)}
     </Text>
  </View>
);

export const TwoColumnLayout = ({ strengths, challenges }: { strengths: { title: string; desc: string }[], challenges: { title: string; desc: string }[] }) => (
  <View style={uiStyles.twoColumnLayout}>
    <View style={uiStyles.columnHalf}>
      <Text style={uiStyles.columnTitle}>Stiprybės</Text>
      {strengths.map((item, i) => (
        <StrengthItem key={i} title={item.title} desc={item.desc} />
      ))}
    </View>
    <View style={uiStyles.columnHalf}>
      <Text style={uiStyles.columnTitle}>Augimo Zonos</Text>
      {challenges.map((item, i) => (
        <ChallengeItem key={i} title={item.title} desc={item.desc} />
      ))}
    </View>
  </View>
);
