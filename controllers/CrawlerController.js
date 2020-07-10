const CharacterModel = require('../models/Character')
const cheerio = require('cheerio')
const request = require('request-promise')

const URL = "https://onepiece.fandom.com/wiki/List_of_Canon_Characters"
const BASE_URL = "https://onepiece.fandom.com"

class CharactersCrawler {
    constructor() {
        this.startCraw = this.startCraw.bind(this)
    }
    async startCraw(req, res, next) {
        const self = this
        const listPage = await this.getPageContent(URL)
        const urls = this.html2ListUrls(listPage)
        console.log(urls)
        const characterModel = new CharacterModel()
        for (const url of urls) {
            try {
                const characterPage = await this.getPageContent(url)
                const character = self.html2CharaterDetail(characterPage)
                console.log(character.name)
                characterModel.insert(character)
            } catch (error) {
                console.log(error)
            }
        }
        return res.status(200).json('done')
    }
    getPageContent = (uri) => {
        const options = {
            uri,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            transform: (body) => {
                return cheerio.load(body)
            }
        }
        return request(options)
    }
    html2ListUrls = $ => {
        let urls = []
        $('table').first().find('tbody > tr').each((index, element) => {
            const link = BASE_URL + $(element).find('td:nth-child(2) a').attr('href')
            urls.push(link)
        })
        urls = urls.filter(url => url != 'https://onepiece.fandom.comundefined')
        return urls
    }
    html2CharaterDetail = $ => {
        let character = {}
        const aside = $('aside').first()
            //anime pic
        character.anime_pic = aside.find('.image.image-thumbnail').first().attr('href')
            //name
        character.name = $('h1.page-header__title').first().text()
            //debut
        character.debut = ""
        aside.find('[data-source=first] > .pi-data-value > a').each((index, element) => {
                if (index == 0) character.debut += $(element).text()
                else character.debut += ', ' + $(element).text()

            })
            // affiliation
        character.affiliation = ""
        aside.find('[data-source=affiliation] > .pi-data-value > a').each((index, element) => {
                if (index == 0) character.affiliation += $(element).text()
                else character.affiliation += ', ' + $(element).text()
            })
            // occupation
        character.occupation = ""
        aside.find('[data-source=occupation] > .pi-data-value > a').each((index, element) => {
                if (index == 0) character.occupation += $(element).text()
                else character.occupation += ', ' + $(element).text()
            })
            //status
        character.status = aside.find('[data-source=status] > .pi-data-value').text()
            //birthday
        character.birthday = aside.find('[data-source=birth] > .pi-data-value').clone().children().remove().end().text()
            //full body pic
        character.full_body_pic = $('#Appearance').parent().nextUntil('p', 'figure').find('a').first().attr('href')
            //appearance
        character.appearance = $('#Appearance').parent().nextUntil('h2', 'p').text().replace(/\r?\n|\r/g, "").replace(/\[\d\]/g, "")
            //personality
        character.personality = $('#Personality').parent().nextUntil('h2', 'p').text().replace(/\r?\n|\r/g, "").replace(/\[\d\]/g, "")
        return character
    }
}
module.exports = new CharactersCrawler()