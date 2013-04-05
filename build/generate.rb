#!/usr/bin/env ruby

require 'rubygems'
require 'gollum'
require 'gollum-lib'
require 'mustache'

WIKI_DIR = ENV['WIKI_DIR']
OUT_DIR = File.join(ENV['OUT_DIR'], "docs")
TEMPLATE = File.read(ENV['TEMPLATE_FILE'])

LINKS_RE = Regexp.new('"https://github.com/montagejs/montage/wiki/([^"]+)"')

if not File.exists?(OUT_DIR) then
  Dir.mkdir(OUT_DIR)
end

wiki = Gollum::Wiki.new(WIKI_DIR)
wiki.pages().each { |page|
  filename = File.join(OUT_DIR, "#{page.filename_stripped}.html")
  page.formatted_data("utf-8") { |data|
    # replace links to Github with local relative ones
    data = data.to_s.gsub(LINKS_RE, '"\1.html"')
    # render the rendered wiki page into a full html document
    doc = Mustache.render(TEMPLATE, :title => page.name, :content => data)
    puts "Write #{filename}"
    File.open(filename, 'w') {|f| f.write(doc) }
  }
}

