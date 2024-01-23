/**
 * All Request Body
*/

// Full game request Body
export const gameRequestBody = "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover.*,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;";

// Tous les jeux les plus Hypes de la commu
export const gameHypesRequestBody = "fields name,summary,cover.*,platforms.*,genres.*,themes.*,screenshots.*,videos.*;sort hypes desc;"

// Les 100 jeux les plus Hypes de la commu
export const gameSeachRequestBody = `${gameHypesRequestBody}limit 104;`
