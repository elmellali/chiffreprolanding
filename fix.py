with open(r'src\App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content += '''
export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  )
}
'''

with open(r'src\App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
