
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  templates, 
  categories, 
  colorOptions, 
  tags as allTags, 
  type Template 
} from "@/utils/templateData";
import { Search, Eye } from "lucide-react";

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(templates);

  // Filter templates based on search query, category, color, and tags
  useEffect(() => {
    const filtered = templates.filter((template) => {
      // Filter by search query
      const matchesSearch = 
        searchQuery === "" || 
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by category
      const matchesCategory = 
        selectedCategory === null || 
        template.category === selectedCategory;
      
      // Filter by color
      const matchesColor = 
        selectedColor === null || 
        template.color === selectedColor;
      
      // Filter by tags
      const matchesTags = 
        selectedTags.length === 0 || 
        template.tags.some(tag => selectedTags.includes(tag.id));
      
      return matchesSearch && matchesCategory && matchesColor && matchesTags;
    });
    
    setFilteredTemplates(filtered);
  }, [searchQuery, selectedCategory, selectedColor, selectedTags]);

  // Toggle tag selection
  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar / Filters */}
          <aside className="w-full md:w-64 sticky-sidebar space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>
                Filters
              </h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Category</h4>
                <RadioGroup 
                  value={selectedCategory || ""} 
                  onValueChange={(value) => setSelectedCategory(value || null)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="" id="category-all" />
                      <Label htmlFor="category-all">All Categories</Label>
                    </div>
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <RadioGroupItem value={category} id={`category-${category}`} />
                        <Label htmlFor={`category-${category}`}>{category}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              
              {/* Colors Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Colors</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`w-6 h-6 rounded-full border-2 ${selectedColor === null ? 'border-primary' : 'border-transparent'}`}
                    onClick={() => setSelectedColor(null)}
                    title="All colors"
                  >
                    <span className="sr-only">All colors</span>
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500"></div>
                  </button>
                  {colorOptions.map((color) => (
                    <button
                      key={color.id}
                      className={`w-6 h-6 rounded-full border-2 ${selectedColor === color.id ? 'border-primary' : 'border-transparent'}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color.id)}
                      title={color.name}
                    >
                      <span className="sr-only">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Tags Filter */}
              <div>
                <h4 className="font-medium mb-2">Tags</h4>
                <div className="space-y-2">
                  {allTags.map((tag) => (
                    <div key={tag.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`tag-${tag.id}`} 
                        checked={selectedTags.includes(tag.id)}
                        onCheckedChange={() => handleTagToggle(tag.id)}
                      />
                      <Label htmlFor={`tag-${tag.id}`}>{tag.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          
          {/* Main content */}
          <main className="flex-1">
            {/* Search bar */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for templates..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Templates grid */}
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <div key={template.id} className="template-card group border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative overflow-hidden">
                      <img
                        src={template.image}
                        alt={template.name}
                        className="w-full aspect-video object-cover transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link to={`/templates/${template.id}/preview`}>
                          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold truncate">{template.name}</h3>
                        <span 
                          className="text-xs px-2 py-1 rounded-full" 
                          style={{ 
                            backgroundColor: colorOptions.find(c => c.id === template.color)?.value + '20',
                            color: colorOptions.find(c => c.id === template.color)?.value
                          }}
                        >
                          {template.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{template.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {template.tags.map((tag) => (
                          <span key={tag.id} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No templates found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                    setSelectedColor(null);
                    setSelectedTags([]);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Templates;
